import { mdiChartTimelineVariant, mdiUpload } from '@mdi/js';
import Head from 'next/head';
import React, { ReactElement, useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';

import CardBox from '../../components/CardBox';
import LayoutAuthenticated from '../../layouts/Authenticated';
import SectionMain from '../../components/SectionMain';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import { getPageTitle } from '../../config';

import { Field, Form, Formik } from 'formik';
import FormField from '../../components/FormField';
import BaseDivider from '../../components/BaseDivider';
import BaseButtons from '../../components/BaseButtons';
import BaseButton from '../../components/BaseButton';
import FormCheckRadio from '../../components/FormCheckRadio';
import FormCheckRadioGroup from '../../components/FormCheckRadioGroup';
import FormFilePicker from '../../components/FormFilePicker';
import FormImagePicker from '../../components/FormImagePicker';
import { SelectField } from '../../components/SelectField';
import { SelectFieldMany } from '../../components/SelectFieldMany';
import { SwitchField } from '../../components/SwitchField';
import { RichTextField } from '../../components/RichTextField';

import { update, fetch } from '../../stores/folders/foldersSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

const EditFolders = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    name: '',

    type: '',

    color: '',

    favorite: false,

    status: '',

    documents: [],

    owner: '',
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { folders } = useAppSelector((state) => state.folders);

  const { foldersId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: foldersId }));
  }, [foldersId]);

  useEffect(() => {
    if (typeof folders === 'object') {
      setInitialValues(folders);
    }
  }, [folders]);

  useEffect(() => {
    if (typeof folders === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = folders[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [folders]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: foldersId, data }));
    await router.push('/folders/folders-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit folders')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit folders'}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>
              <FormField label='Name'>
                <Field name='name' placeholder='Name' />
              </FormField>

              <FormField label='Type' labelFor='type'>
                <Field name='type' id='type' component='select'>
                  <option value='personal'>personal</option>

                  <option value='shared'>shared</option>
                </Field>
              </FormField>

              <FormField label='Color'>
                <Field name='color' placeholder='Color' />
              </FormField>

              <FormField label='Favorite' labelFor='favorite'>
                <Field
                  name='favorite'
                  id='favorite'
                  component={SwitchField}
                ></Field>
              </FormField>

              <FormField label='Status' labelFor='status'>
                <Field name='status' id='status' component='select'>
                  <option value='active'>active</option>

                  <option value='inactive'>inactive</option>
                </Field>
              </FormField>

              <FormField label='Documents' labelFor='documents'>
                <Field
                  name='documents'
                  id='documents'
                  component={SelectFieldMany}
                  options={initialValues.documents}
                  itemRef={'documents'}
                  showField={'title'}
                ></Field>
              </FormField>

              <FormField label='Owner' labelFor='owner'>
                <Field
                  name='owner'
                  id='owner'
                  component={SelectField}
                  options={initialValues.owner}
                  itemRef={'users'}
                  showField={'firstName'}
                ></Field>
              </FormField>

              <BaseDivider />
              <BaseButtons>
                <BaseButton type='submit' color='info' label='Submit' />
                <BaseButton type='reset' color='info' outline label='Reset' />
                <BaseButton
                  type='reset'
                  color='danger'
                  outline
                  label='Cancel'
                  onClick={() => router.push('/folders/folders-list')}
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

EditFolders.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_FOLDERS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditFolders;
