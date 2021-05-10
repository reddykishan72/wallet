import emailjs from 'emailjs-com';
import config from '../config';

export const sendEmail = (
	sharingUrl,
	receiver_email
) => {
  if (config.emailJsServiceID && config.emailJsTemplateID && config.emailJsUserID) {
    emailjs
      .send(
        config.emailJsServiceID,
        config.emailJsTemplateID,
        {
          receiver_email: receiver_email,
          link: sharingUrl,
        },
        config.emailJsUserID
      )
      .then(
        function (response) {
          console.log('SUCCESS!', response.status, response.text);
        },
        function (error) {
          console.log('FAILED...', error);
        }
      );
  }
};
