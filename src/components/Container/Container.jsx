import React from 'react';
import css from './Container.module.css';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import * as yup from 'yup';
import shortid from 'shortid';

const Container = ({ onSubmit }) => {
  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .matches(
        /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)$/,
        'Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d\'Artagnan'
      )
      .required('Name is required'),
    number: yup
      .string()
      .matches(
        /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,
        'Phone number must be digits and can contain spaces, dashes, parentheses and can start with + 000-00-00'
      )
      .required('Phone number is required'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      number: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
      formik.resetForm();
    },
  });

  const nameInputId = shortid.generate();
  const numberInputId = shortid.generate();

  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor={nameInputId} className={css.titleInput}>
        Name
        <input
          className={css.inputTitle}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          type="text"
          name="name"
          id={nameInputId}
        />
        {formik.touched.name && formik.errors.name && (
          <div className={css.error}>{formik.errors.name}</div>
        )}
      </label>
      <label htmlFor={numberInputId} className={css.titleInput}>
        Number
        <input
          className={css.inputTitle}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.number}
          type="tel"
          name="number"
          id={numberInputId}
        />
        {formik.touched.number && formik.errors.number && (
          <div className={css.error}>{formik.errors.number}</div>
        )}
      </label>
      <button className={css.btnTitle} type="submit">
        Add contact
      </button>
    </form>
  );
};

Container.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Container;
