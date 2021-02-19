import { Injectable } from '@angular/core';
import { LANGUAGE_LEVELS, LANGUAGE_NAMES } from '@constants/language.constant';
import { Course, CourseBackend, CourseBackendSent } from '@models/course.model';
import { DrivingLicence } from '@models/driving-licence.model';
import { Education, EducationBackend, EducationBackendSent } from '@models/education.model';
import { Language, LanguageBackend } from '@models/language.model';
import { UserBackend } from '@models/user.model';
import { User } from '@models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ParserService {

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
          id: course.id,
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
          id: education.id,
          name: education.name,
          finishDate: education.finish_date ? new Date(education.finish_date) : null,
          finished: education.finished
        }
        return parsededucation;
      }),
      languages: user.languages.map(language => {
        const parsedLanguage: Language = {
          id: language.id,
          name: language.name as LANGUAGE_NAMES,
          level: language.level as LANGUAGE_LEVELS,
          finishDate: language.finish_date ? new Date(language.finish_date) : null
        }
        return parsedLanguage;
      }),
      emailVerified: user.email_verified_at ? true : false,
      deactivated: user.deactivated,
      avatar: user.avatar,
    }

    return parsedUser;
  }

  userToBackendUser(user: User): UserBackend {

    return null

  }

  courseToBackendCourse(userId: number, course: Course): CourseBackendSent {
    return {
      user_id: userId,
      course_id: course.id,
      number: course.number,
      expedition_date: course.expeditionDate ? `${course.expeditionDate.getFullYear()}-${course.expeditionDate.getMonth() + 1}-${course.expeditionDate.getDate()}` : null,
      valid_until: course.validUntil ? `${course.validUntil.getFullYear()}-${course.validUntil.getMonth() + 1}-${course.validUntil.getDate()}` : null,
    }
  }

  courseBackendToCourse(courseBackend: CourseBackend): Course {
    return {
      id: courseBackend.id,
      name: courseBackend.name,
      number: courseBackend.number,
      expeditionDate: courseBackend.expedition_date ? new Date(courseBackend.expedition_date) : null,
      validUntil: courseBackend.valid_until ? new Date(courseBackend.valid_until) : null,
    }
  }

  educationToEducationBackend(userId: number, education: Education): EducationBackend {
    return {
      id: education.id,
      user_id: userId,
      name: education.name,
      finish_date: education.finishDate ? `${education.finishDate.getFullYear()}-${education.finishDate.getMonth() + 1}-${education.finishDate.getDate()}` : null,
      finished: education.finished,
    }
  }

  educationBackendToEducation(educationBackend: EducationBackend): Education {
    return {
      id: educationBackend.id,
      name: educationBackend.name,
      finishDate: educationBackend.finish_date ? new Date(educationBackend.finish_date) : null,
      finished: educationBackend.finished,
    }
  }

  languageToLanguageBackend(userId: number, language: Language): LanguageBackend {
    return {
      id: language.id,
      user_id: userId,
      name: language.name,
      level: language.level,
      finish_date: language.finishDate ? `${language.finishDate.getFullYear()}-${language.finishDate.getMonth() + 1}-${language.finishDate.getDate()}` : null,
    }
  }

  languageBackendToLanguage(languageBackend: LanguageBackend): Language {
    return {
      id: languageBackend.id,
      name: languageBackend.name as LANGUAGE_NAMES,
      level: languageBackend.level as LANGUAGE_LEVELS,
      finishDate: languageBackend.finish_date ? new Date(languageBackend.finish_date) : null,
    }
  }

  translateToBackend(userProperty: string) {
    switch (userProperty) {
      case 'actualPosition': return 'actual_position';
      case 'addressNumber': return 'address_number';
      case 'addressStreet': return 'address_street';
      case 'addressCity': return 'address_city';
      case 'addressCp': return 'address_cp';
      case 'addressCountry': return 'address_country';
      case 'birthDate': return 'birth_date';
      case 'userTypeId': return 'user_type_id';
      case 'courseId': return 'course_id';
      case 'expeditionDate': return 'expedition_date';
      case 'validUntil': return 'valid_until';
      case 'drivingLicences': return 'driving_licences';
      default: return userProperty;
    }
  }

}
