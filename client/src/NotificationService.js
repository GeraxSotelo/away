import Swal from "sweetalert2";

export default class NotificationService {
  static async inputData(title = "Enter Inputs", profileData) {
    try {
      const { value: formValues } = await Swal.fire({
        title,
        html:
          `<form class="needs-validation profile-form" novalidate @change="checkStuff()">` +
          `<label class="mb-0">First Name <span style="color: red">*</span></label>` +
          `<input id="firstName" class="swal2-input" value="${profileData.firstName ||
            ""}" placeholder="Enter your first name">` +
          `<label class="mb-0">Last Name <span style="color: red">*</span></label>` +
          `<input id="lastName" class="swal2-input" value="${profileData.lastName ||
            ""}" placeholder="Enter your last name">` +
          `<label class="mb-0">Username <span style="color: red">*</span></label>` +
          `<input id="username" class="swal2-input" value="${profileData.username ||
            ""}" placeholder="Enter a display name">` +
          `<label class="mb-0">Favorite quote</label>` +
          `<input id="description" class="swal2-input" value="${profileData.description ||
            ""}" placeholder="Enter favorite quote">` +
          `<label class="mb-0">Email <span style="color: red">*</span></label>` +
          `<input id="email" type="email" class="swal2-input" value="${profileData.email ||
            ""}" placeholder="Enter public email address">` +
          `<label class="mb-0">Image URL</label>` +
          `<input id="img-url" type="text" class="swal2-input" value="${profileData.imgURL ||
            ""}" placeholder="Enter image URL">` +
          `<span style="color: red">*</span> indicates required field` +
          `</form>`,
        // NOTE for email validation look into validitystate=true, @change
        focusConfirm: false,
        preConfirm: () => {
          let firstName = document.getElementById("firstName").value;
          let lastName = document.getElementById("lastName").value;
          let username = document.getElementById("username").value;
          let description = document.getElementById("description").value;
          let email = document.getElementById("email");
          let imgURL = document.getElementById("img-url").value;
          if (!firstName || !lastName || !username || !email.value) {
            Swal.showValidationMessage("Please fill out required fields");
          }
          if (email.validity.typeMismatch == true) {
            Swal.showValidationMessage("Invalid Email Address");
          }
          return [
            firstName,
            lastName,
            username,
            description,
            email.value,
            imgURL
          ];
        }
      });
      if (formValues) {
        return {
          firstName: formValues[0],
          lastName: formValues[1],
          username: formValues[2],
          description: formValues[3],
          email: formValues[4],
          imgURL: formValues[5]
        };
      }
    } catch (error) {
      return false;
    }
  }

  /********************CARPOOLS********************/
  static async inputCar(title = "Enter Inputs") {
    try {
      const { value: formValues } = await Swal.fire({
        title,
        html:
          `<label class="mb-0">Carpool Name<span style="color: red">*</span></label>` +
          `<input id="carpool-name" class="swal2-input">` +
          `<label class="mb-0">Number of Seats<span style="color: red">*</span></label>` +
          `<input type="number" min="1" id="seat-details" class="swal2-input" placeholder="1">`,
        focusConfirm: false,
        preConfirm: () => {
          let carPoolName = document.getElementById("carpool-name").value;
          let seatDetails = document.getElementById("seat-details").value;
          if (!carPoolName || !seatDetails) {
            Swal.showValidationMessage("Please fill out required fields");
          }
          return [carPoolName, seatDetails];
        }
      });
      if (formValues) {
        return {
          name: formValues[0],
          totalSeats: formValues[1]
        };
      }
    } catch (error) {
      return error;
    }
  }

  /********************MEALS********************/
  static async inputMeal(title = "Enter Inputs", meal) {
    try {
      const { value: formValues } = await Swal.fire({
        title,
        html:
          `<form class="meal-form">` +
          `<label class="mb-0">Meal Name<span style="color: red">*</span></label>` +
          `<input id="meal-name" class="swal2-input" value="${meal.title ||
            ""}" placeholder="e.g., Sunday breakfast">` +
          `<label class="mb-0">Meal Details</label>` +
          `<input id="meal-details" class="swal2-input" value="${meal.details ||
            ""}" placeholder="Details">` +
          `</form>`,
        focusConfirm: false,
        preConfirm: () => {
          let mealName = document.getElementById("meal-name").value;
          let mealDetails = document.getElementById("meal-details").value;
          if (!mealName) {
            Swal.showValidationMessage("Please fill out required fields");
          }
          return [mealName, mealDetails];
        }
      });
      if (formValues) {
        return {
          title: formValues[0],
          details: formValues[1]
        };
      }
    } catch (error) {
      return error;
    }
  }
  static async inputFood(title = "Enter Inputs", mealData) {
    try {
      const { value: formValues } = await Swal.fire({
        title,
        html:
          `<form class="meal-form"">` +
          `<label class="mb-0">Food Item<span style="color: red">*</span></label>` +
          `<input id="food-name" class="swal2-input" value="${mealData.foodItems
            .foodName || ""}" placeholder="Item name">` +
          `<label class="mb-0">Details</label>` +
          `<input id="food-details" class="swal2-input" value="${mealData
            .foodItems.details || ""}" placeholder="Details">` +
          `</form>`,
        focusConfirm: false,
        preConfirm: () => {
          let foodName = document.getElementById("food-name").value;
          let foodDetails = document.getElementById("food-details").value;
          if (!foodName) {
            Swal.showValidationMessage("Please fill out required fields");
          }
          return [foodName, foodDetails];
        }
      });
      if (formValues) {
        return {
          foodName: formValues[0],
          details: formValues[1]
        };
      }
    } catch (error) {
      return error;
    }
  }

  static async inputListItem(title = "Enter Inputs", item) {
    try {
      const { value: formValues } = await Swal.fire({
        title,
        html:
          `<form class="item-form"">` +
          `<label class="mb-0">Item Name<span style="color: red">*</span></label>` +
          `<input id="item-name" class="swal2-input" value="${item.title ||
            ""}" placeholder="Item name">` +
          `</form>`,
        focusConfirm: false,
        preConfirm: () => {
          let itemName = document.getElementById("item-name").value;
          if (!itemName) {
            Swal.showValidationMessage("Please fill out required fields");
          }
          return [itemName];
        }
      });
      if (formValues) {
        return {
          itemName: formValues[0]
        };
      }
    } catch (error) {
      return error;
    }
  }

  static async inputList(title = "Enter Inputs") {
    try {
      const { value: formValues } = await Swal.fire({
        title,
        html: '<input id="swal-input1" class="swal2-input">',
        focusConfirm: false,
        preConfirm: () => {
          return [document.getElementById("swal-input1").value];
        }
      });
      if (formValues) {
        return formValues[0];
      }
    } catch (error) {
      return false;
    }
  }

  static async errorMessage(text = "Oops") {
    try {
      await Swal.fire({
        icon: "error",
        text
      });
    } catch (error) {
      return false;
    }
  }
}
