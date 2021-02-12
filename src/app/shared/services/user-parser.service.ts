import { Injectable } from '@angular/core';
import { LANGUAGE_LEVELS, LANGUAGE_NAMES } from '@constants/language.constant';
import { Course } from '@models/course.model';
import { DrivingLicence } from '@models/driving-licence.model';
import { Education } from '@models/education.model';
import { Language } from '@models/language.model';
import { UserBackend } from '@models/user.model';
import { User } from '@models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserParserService {

  constructor() { }

  userBackendToUser(user: UserBackend): User {
    const parsedUser: User = {
      id: user.id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      userType: {
        id: user.user_type.id,
        name: user.user_type.name,
        rank: user.user_type.rank
      },
      dni: user.dni,
      birthDate: user.birth_date ? new Date(user.birth_date) : null,
      address: {
        street: user.address_street,
        number: user.address_number,
        city: user.address_city,
        cp: user.address_cp,
        country: user.address_country
      },
      actualPosition: user.actual_position,
      phone: user.phone,
      courses: user.courses.map(course => {
        const parsedCourse: Course = {
          name: course.name,
          number: course.number,
          expeditionDate: course.expedition_date ? new Date(course.expedition_date) : null,
          validUntil: course.valid_until ? new Date(course.valid_until) : null
        }
        return parsedCourse;
      }),
      drivingLicences: user.driving_licences.map(drivingLicence => {
        const parsedDrivingLicence: DrivingLicence = {
          type: drivingLicence.type,
          expeditionDate: drivingLicence.expedition_date ? new Date(drivingLicence.expedition_date) : null,
          validUntil: drivingLicence.valid_until ? new Date(drivingLicence.valid_until) : null
        }
        return parsedDrivingLicence;
      }),
      educations: user.educations.map(education => {
        const parsededucation: Education = {
          name: education.name,
          finishDate: education.finish_date ? new Date(education.finish_date) : null,
          finished: education.finished
        }
        return parsededucation;
      }),
      languages: user.languages.map(language => {
        const parsedLanguage: Language = {
          name: language.name as LANGUAGE_NAMES,
          level: language.level as LANGUAGE_LEVELS,
          finishDate: language.finish_date ? new Date(language.finish_date) : null
        }
        return parsedLanguage;
      }),
      emailVerified: user.email_verified_at ? true : false,
      deactivated: user.deactivated,
    }

    return parsedUser;
  }

  userToBackendUser(user: User): UserBackend {

    return null

  }

}
