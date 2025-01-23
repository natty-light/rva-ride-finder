'use client';

import LabelInput from "@/components/form/LabelInput";
import RadioInput, { RadioOptions as RadioOption } from "@/components/form/RadioInput";
import useFetchers from "@/hooks/useFetchers";
import { ApiRoutes } from "@/routes";
import { useAuthStore } from "@/stores/auth";
import { Ride, RideCategories, RideDifficulties } from "@prisma/client";
import { useFormik } from "formik";
import type { NextPage } from "next";
import { useMutation } from "react-query";

const CreateRide: NextPage = () => {

  const user = useAuthStore((state) => state.user);

  const { post } = useFetchers();

  const mutation = useMutation({
    mutationFn: (ride: Omit<Ride, 'userId' | 'id' | 'routeId'>) => {
      return post(ApiRoutes.CreateRide, ride);
    }
  });


  const { values, handleSubmit, handleChange } = useFormik<Omit<Ride, 'id' | 'routeId' | 'userId'>>({
    initialValues: {
      category: RideCategories.Road,
      difficulty: RideDifficulties.Green,
      distance: 0,
      description: 'Add a description',
      host: user?.displayName ?? '',
      isDrop: false,
      startDate: new Date(),
      title: 'New Ride'
    },
    onSubmit: (ride) => mutation.mutate(ride)
  });

  const categoryOptions: RadioOption[] = Object.values(RideCategories).map((v): RadioOption => ({
    label: v,
    value: v
  }));

  const difficultyOptions: RadioOption[] = Object.values(RideDifficulties).reverse().map((v) => ({
    label: v,
    value: v,
  }));

  return (
    <div className="w-full p-16">
      <h1 className="pb-2 font-bold">Add a new ride</h1>
      <form id="new-ride-form" className="flex flex-col border-2 border-black w-6/12 rounded p-2 gap-2">
        <div className="flex flex-row g-8">
          <div className="w-6/12 flex flex-col m-4 gap-4">
            <LabelInput label="Ride title">
              <input id="ride-title" type="text" value={values.title} className="border-2 border-gray-600 rounded p-1" />
            </LabelInput>
            <LabelInput label="Ride description" >
              <input id="ride-description" type="text" value={values.description} className="border-2 border-gray-600 rounded p-1" />
            </LabelInput>
            <LabelInput label="Distance">
              <input id="ride-distance" type="number" value={values.distance} className="border-2 border-gray-600 rounded p-1" />
            </LabelInput>
          </div>
          <div className="w-6/12 flex flex-col m-4 gap-4">
            <LabelInput label="Category">
              <RadioInput selectedValue={values.category} setValue={handleChange} options={categoryOptions} />
            </LabelInput>
            <LabelInput label="Difficulty">
              <RadioInput selectedValue={values.difficulty} setValue={handleChange} options={difficultyOptions} />
            </LabelInput>
            <div className="flex flex-row gap-2 ml-2">
              <label>
                Is drop?
              </label>
              <input id="ride-is-drop" type="checkbox" checked={values.isDrop} />
            </div>
            <LabelInput label="Date">
              <input id="ride-date" type="datetime-local" value={values.startDate.toISOString()} />
            </LabelInput>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateRide;