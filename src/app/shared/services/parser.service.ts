import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { USER_DOCUMENTS } from '@constants/user-documents.constant';
import { LANGUAGE_LEVELS, LANGUAGE_NAMES } from '@constants/language.constant';
import { Course, CourseBackend, CourseBackendSent } from '@models/course.model';
import { DrivingLicence } from '@models/driving-licence.model';
import { Education, EducationBackend, EducationBackendSent } from '@models/education.model';
import { Language, LanguageBackend } from '@models/language.model';
import { UserBackend } from '@models/user.model';
import { User } from '@models/user.model';
import { HomeDocument, HomeDocumentBackend, PersonalDocument, PersonalDocumentBackend } from '@models/document.model';
import { HomePost, HomePostBackend } from '@models/home-post.model';

@Injectable({
  providedIn: 'root'
})
export class ParserService {

  constructor(private sanitizer: DomSanitizer) { }

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
      socialSecurityNumber: user.social_security_number,
      bankAccount: user.bank_account,
      avatarFile: typeof user.avatar_file === 'boolean' ? user.avatar_file : this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/${user.avatar_file['extension']};base64,${user.avatar_file['avatar']}`),
      userDocuments: [
        {
          name: USER_DOCUMENTS.dni,
          file: user.dni_file,
        },
        {
          name: USER_DOCUMENTS.sexOffenseCertificate,
          file: user.sex_offense_certificate_file,
        }
      ],
      personalDocuments: [],

    }

    return parsedUser;
  }

  userToBackendUser(user: User): UserBackend {

    return null

  }

  courseToBackendCourse(course: Course): CourseBackendSent {
    return {
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

  educationToEducationBackend(education: Education): EducationBackend {
    return {
      id: education.id,
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

  languageToLanguageBackend(language: Language): LanguageBackend {
    return {
      id: language.id,
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

  parseDrivingLicences(user: User): string {
    if (!user.drivingLicences) return '';
    const drivingLicences = user.drivingLicences;
    let parsedDrivingLicences = '';
    if (drivingLicences.length > 2) {
      for (let i = 0; i < drivingLicences.length - 2; i++) {
        parsedDrivingLicences = parsedDrivingLicences + drivingLicences[i].type + ', ';
      }
      parsedDrivingLicences = parsedDrivingLicences + drivingLicences[drivingLicences.length - 2].type + ' and ' + drivingLicences[drivingLicences.length - 1].type;
    }
    else if (drivingLicences.length == 2) {
      parsedDrivingLicences = drivingLicences[0].type + ' and ' + drivingLicences[1].type;
    }
    else if (drivingLicences.length == 1) {
      parsedDrivingLicences = drivingLicences[0].type;
    }
    return parsedDrivingLicences;
  }

  public blobToFile(theBlob: Blob, fileName: string): File {
    const blob: any = theBlob;
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    blob.lastModifiedDate = new Date();
    blob.name = fileName;

    //Cast to a File() type
    return <File>theBlob;
  }

  public personalDocumentBackendToPersonalDocument(personalDocumentBackend: PersonalDocumentBackend): PersonalDocument {
    return {
      id: personalDocumentBackend.id,
      userId: personalDocumentBackend.user_id,
      name: personalDocumentBackend.original_name,
      file: null,
      createdAt: new Date(personalDocumentBackend.created_at)
    }
  }

  public homePostBackendToHomePost(homePostBackend: HomePostBackend): HomePost {
    const splitBody = homePostBackend.body.split('\n');
    const parsedBody = splitBody.reduce((a, c) => {
      return a + '<p>' + c + '</p>'
    }, '');
    return {
      id: homePostBackend.id,
      title: homePostBackend.title,
      body: parsedBody,
      position: homePostBackend.position,
      createdAt: new Date(homePostBackend.created_at),
      documents: homePostBackend.documents.map((homeDocumentBackend: HomeDocumentBackend) => this.homeDocumentBackendToHomeDocument(homeDocumentBackend))
    }
  }

  public homeDocumentBackendToHomeDocument(homeDocumentBackend: HomeDocumentBackend): HomeDocument {
    return {
      id: homeDocumentBackend.id,
      homePostId: homeDocumentBackend.home_post_id,
      name: homeDocumentBackend.original_name,
      file: null,
      createdAt: new Date(homeDocumentBackend.created_at)
    }
  }

}
