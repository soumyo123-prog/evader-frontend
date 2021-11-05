export default class Validate {
  // The below field is for final validation
  static isValid(field: string): boolean {
    const value: string = field.trim();
    if (value.length > 0) {
      return true;
    }
    return false;
  }

  static isValidDateTime(dateTime: Date): boolean {
    const currDate = new Date();
    if (dateTime.getTime() < currDate.getTime()) {
      return false;
    }
    return true;
  }

  // The below methods are for character by character validation
  static validateName(name: string): [boolean, string] {
    if (name.length === 0) {
      return [true, 'Name field is required!'];
    }
    if (name.length > 100) {
      return [false, 'Maximum name field length exceeded!'];
    }
    if (name[name.length - 1] >= 'a' && name[name.length - 1] <= 'z') {
      return [true, 'So far so good!'];
    }
    if (name[name.length - 1] >= 'A' && name[name.length - 1] <= 'Z') {
      return [true, 'So far so good!'];
    }
    if (name.length === 1 && name[0] === ' ') {
      return [false, 'Cannot input space at the beginning of name!'];
    }
    if (
      name.length > 1 &&
      name[name.length - 1] === ' ' &&
      name[name.length - 2] === ' '
    ) {
      return [false, 'Cannot input two spaces between two parts of name!'];
    }
    return [true, 'So far so good!'];
  }

  static validateDescription(description: string): [boolean, string] {
    if (description.length > 255) {
      return [false, 'Maximum description field length exceeded!'];
    }
    return [true, 'So far so good!'];
  }

  static validateVenue(venue: string): [boolean, string] {
    if (venue.length === 0) {
      return [true, 'Venue field is required!'];
    }
    if (venue.length > 255) {
      return [false, 'Maximum venue field length exceeded!'];
    }
    return [true, 'So far so good!'];
  }

  static validateEmail(email: string): [boolean, string] {
    if (email.length === 0) {
      return [true, 'Email field is required!'];
    }
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(email.toLowerCase())) {
      return [false, 'Email provided is not valid'];
    }
    return [true, 'So far so good!'];
  }
}
