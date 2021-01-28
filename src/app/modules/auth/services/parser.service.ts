import { Injectable } from '@angular/core';
import { Course } from '@models/course.model';
import { DrivingLicence } from '@models/driving-licence.model';
import { UserBackend } from '@models/user-backend.model';
import { User } from '@models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ParserService {

  constructor() { }

  parseUser(user: UserBackend): User {
    const parsedUser = {
      id: user.id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      userType: {
        name: user.user_type.name,
        rank: user.user_type.rank
      },
      dni: user.dni,
      birthDate: new Date(user.birth_date),
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
          expeditionDate: new Date(course.expedition_date),
          validUntil: new Date(course.valid_until)
        }
        return parsedCourse;
      }),
      drivingLicences: user.driving_licences.map(drivingLicence => {
        const parsedDriverLicence: DrivingLicence = {
          type: drivingLicence.type,
          expeditionDate: new Date(drivingLicence.expedition_date),
          validUntil: new Date(drivingLicence.valid_until)
        }
        return parsedDriverLicence;
      })
    }

    return parsedUser;
  }

}
