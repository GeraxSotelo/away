import express from "express";
import { Authorize } from "../middleware/authorize";
import tripService from "../services/TripService";
import mealService from "../services/MealService";
import listService from "../services/ListService";
import socket from "../socket/SocketService";
import carpoolService from "../services/CarpoolService";
import profileService from "../services/ProfileService";

export default class TripController {
  constructor() {
    this.router = express
      .Router()
      .use(Authorize.authenticated)
      .get("", this.getAll)
      .get("/:id", this.getByTripId)
      .get("/:id/meals", this.getMealsByTripId)
      .get("/:id/destinations", this.getDestinationsByTripId)
      .get("/:id/carpools", this.getCarpoolsByTripId)
      .get("/:id/lists", this.getListsByTripId)
      .post("", this.create)
      .post("/:id/destinations", this.addDestination)
      .post("/:id/collabs", this.addCollab)
      .put("/:id", this.edit)
      .put("/:tripId/destinations/:id", this.editDestination)
      .delete("/:id", this.delete)
      .delete("/:tripId/destinations/:id", this.removeDestination);
  }

  defaultRoute(req, res, next) {
    next({ status: 404, message: "No Such Route" });
  }
  async addCollab(req, res, next) {
    try {
      let data = await tripService.addCollab(
        req.params.id,
        req.session.uid,
        req.body
      );
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async getMealsByTripId(req, res, next) {
    try {
      let data = await mealService.getMealsByTripId(
        req.params.id,
        req.session.uid
      );
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async getListsByTripId(req, res, next) {
    try {
      let data = await listService.getListsByTripId(
        req.params.id,
        req.session.uid
      );
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }

  // #region -- SECTION TRIPS --
  async getAll(req, res, next) {
    try {
      let data = await tripService.getAll(req.session.uid);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async getByTripId(req, res, next) {
    try {
      let data = await tripService.getByTripId(req.params.id, req.session.uid);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      let collabProfile = await profileService.getProfileByUserId(
        req.session.uid
      );
      req.body.collabsProfiles = [collabProfile];
      req.body.authorId = req.session.uid;
      req.body.collabs = [req.session.uid];
      console.log(req.body);
      let data = await tripService.create(req.body);
      return res.status(201).send(data);
    } catch (error) {
      next(error);
    }
  }

  async edit(req, res, next) {
    try {
      let data = await tripService.edit(
        req.params.id,
        req.session.uid,
        req.body
      );
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      let data = await tripService.delete(req.params.id, req.session.uid);
      return res.send("Deletion successful");
    } catch (error) {
      next(error);
    }
  }
  // #endregion

  // #region -- SECTION DESTINATIONS --
  async getDestinationsByTripId(req, res, next) {
    try {
      let data = await tripService.getDestinationsByTripId(
        req.params.id,
        req.session.uid
      );
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async addDestination(req, res, next) {
    try {
      req.body.authorId = req.session.uid;
      let data = await tripService.addDestination(req.params.id, req.body);
      socket.notifyAddDestination(data);
      return res.status(201).send(data);
    } catch (error) {
      next(error);
    }
  }

  async editDestination(req, res, next) {
    try {
      let data = await tripService.editDestination(
        {
          tripId: req.params.tripId,
          userId: req.session.uid,
          destinationId: req.params.id,
          location: req.body.location
        },
        req.params.id
      );
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async removeDestination(req, res, next) {
    try {
      let data = await tripService.removeDestination({
        tripId: req.params.tripId,
        userId: req.session.uid,
        destinationId: req.params.id
      });
      socket.notifyRemoveDestination(data);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
  // #endregion

  // #region -- SECTION CARPOOLS --
  async getCarpoolsByTripId(req, res, next) {
    try {
      let data = await carpoolService.getCarpoolsByTripId(
        req.params.id,
        req.session.uid
      );
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }

  // #endregion
}
