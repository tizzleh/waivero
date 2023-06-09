'use client';
import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Mail, User, MessageCircle } from 'lucide-react';

const ContactSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  message: Yup.string().required('Required'),
});

const ContactForm: React.FC = () => {
  return (
    <div className="mt-24 bg-white p-6 max-w-md mx-auto rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">Contact Us</h1>
      <Formik
        initialValues={{
          name: '',
          email: '',
          message: '',
        }}
        validationSchema={ContactSchema}
        onSubmit={(values, { setSubmitting }) => {
          // Replace this with your logic
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-gray-700">
                <User className="inline-block mr-2"/>
                Name
              </label>
              <Field
                type="text"
                name="name"
                id="name"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
              />
              <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700">
                <Mail className="inline-block mr-2"/>
                Email
              </label>
              <Field
                type="email"
                name="email"
                id="email"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div>
              <label htmlFor="message" className="block text-gray-700">
                <MessageCircle className="inline-block mr-2"/>
                Message
              </label>
              <Field
                as="textarea"
                name="message"
                id="message"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
              />
              <ErrorMessage name="message" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ContactForm;

