'use client';

import LabelInput from "@/components/form/LabelInput";
import useFetchers from "@/hooks/useFetchers";
import { ApiRoutes } from "@/routes";
import { useAuthStore } from "@/stores/auth";
import { Ride, RideCategories, RideDifficulties } from "@prisma/client";
import { Field, Form, Formik } from "formik";
import type { NextPage } from "next";
import { useMemo } from "react";
import { useMutation } from "react-query";

type FormRide = Omit<Ride, 'userId' | 'id' | 'routeId'>

const CreateRide: NextPage = () => {

  const user = useAuthStore((state) => state.user);

  const { post } = useFetchers();

  const mutation = useMutation({
    mutationFn: (ride: FormRide) => {
      return post<FormRide, { rideId: number }>(ApiRoutes.CreateRide, ride);
    }
  });

  const initialValues: FormRide = useMemo(() => ({
    category: RideCategories.Road,
    difficulty: RideDifficulties.Green,
    distance: 0,
    description: 'Add a description',
    host: user?.displayName ?? '',
    isDrop: false,
    startDate: new Date(),
    title: 'New Ride'
  }), [user]);

  const handleSubmit = async (r: FormRide) => {
    const creationResponse = mutation.mutate(r);
  };

  const categoryOptions = Object.values(RideCategories).map((v) => ({
    label: v,
    value: v
  }));

  const difficultyOptions = Object.values(RideDifficulties).reverse().map((v) => ({
    label: v,
    value: v,
  }));

  return (
    <div className="w-10/12 p-16">
      <h1 className="pb-2 font-bold">Add a new ride</h1>
      <Formik
        initialValues={initialValues}
        className="flex flex-col border-2 border-black w-6/12 rounded p-2 gap-2"
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="flex flex-row g-8">
            <div className="w-6/12 flex flex-col m-4 gap-4">
              <LabelInput label="Ride title">
                <Field name="title" type="text" className="border-2 border-gray-600 rounded p-1" />
              </LabelInput>
              <LabelInput label="Ride description" >
                <Field name="description" type="text" className="border-2 border-gray-600 rounded p-1" />
              </LabelInput>
              <LabelInput label="Distance">
                <Field name="distance" type="number" className="border-2 border-gray-600 rounded p-1" />
              </LabelInput>
            </div>
            <div className="w-6/12 flex flex-col m-4 gap-4">
              <LabelInput label="Category">
                <div className="flex flex-row gap-4">
                  {categoryOptions.map(({ label, value }) => (
                    <label key={label} className="flex flex-row gap-2">
                      {label}
                      <Field name="category" type="radio" value={value} />
                    </label>
                  ))}
                </div>
              </LabelInput>
              <LabelInput label="Difficulty">
                <div className="flex flex- gap-4">
                  {difficultyOptions.map(({ label, value }) => (
                    <label key={label} className="flex flex-row gap-2">
                      {label}
                      <Field name="difficulty" type="radio" value={value} />
                    </label>
                  ))}
                </div>
              </LabelInput>
              <div className="flex flex-row gap-2 ml-2">
                <label>
                  Is drop?
                </label>
                <Field name="isDrop" type="checkbox" />
              </div>
              <LabelInput label="Date">
                <Field name="startDate" type="datetime-local" />
              </LabelInput>
            </div>
            <button type="submit">
              Create Ride
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default CreateRide;