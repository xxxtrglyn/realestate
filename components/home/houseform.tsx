import React, { useImperativeHandle, useState } from "react";

type houseForm = {
  square: number;
  price: number;
  bedroom: number;
  bathroom: number;
  files?: File | null;
};

export interface loading {
  setloading(): void;
}

const HouseForm = React.forwardRef<
  loading,
  { value?: houseForm; onSubmit: (value: houseForm) => void }
>(({ value, onSubmit }, ref) => {
  useImperativeHandle(ref, () => ({
    setloading() {
      toggleLoading();
    },
  }));
  const [formValue, setFormValue] = useState<houseForm>({
    square: value?.square || 0,
    price: value?.price || 0,
    bathroom: value?.bathroom || 0,
    bedroom: value?.bedroom || 0,
    files: null,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const toggleLoading = () => {
    setIsLoading((prev) => !prev);
  };
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit({
          square: formValue.square,
          price: formValue.price,
          bedroom: formValue.bedroom,
          bathroom: formValue.bathroom,
          files: formValue.files,
        });
        toggleLoading();
      }}
    >
      <h2 className="text-center font-semibold">New House</h2>
      <div className="flex flex-col">
        <label htmlFor="square" className="font-sans font-medium text-sm">
          Square
        </label>
        <div className="flex items-center rounded-md bg-white px-2 py-1">
          <input
            id="square"
            type="number"
            className="flex-1 outline-none py-1 px-2"
            placeholder="1000"
            value={formValue.square}
            onChange={(event) => {
              setFormValue((prev) => ({
                ...prev,
                square: +event.target.value,
              }));
            }}
          />
          <span className="basis-10 text-center border border-solid px-1 rounded-sm bg-zinc-100 border-cyan-300">
            m<sup className="text-[10px]">2</sup>
          </span>
        </div>
      </div>
      <div className="flex flex-col">
        <label htmlFor="price" className="font-sans font-medium text-sm">
          Price
        </label>
        <div className="flex items-center rounded-md bg-white px-2 py-1">
          <input
            id="price"
            type="number"
            className="flex-1 outline-none py-1 px-2 rounded-md mt-1 mr-1"
            placeholder="999"
            value={formValue.price}
            onChange={(event) => {
              setFormValue((prev) => ({
                ...prev,
                price: +event.target.value,
              }));
            }}
          />
          <span className="basis-10 text-center border border-solid px-1 rounded-sm bg-zinc-100 border-cyan-300">
            $
          </span>
        </div>
      </div>
      <div className="flex flex-col">
        <label htmlFor="bedroom" className="font-sans font-medium text-sm">
          Bedroom
        </label>
        <div className="flex items-center rounded-md bg-white px-2 py-1">
          <input
            id="bedroom"
            type="number"
            className="flex-1 outline-none py-1 px-2 rounded-md mt-1 mr-1"
            placeholder="3"
            value={formValue.bedroom}
            onChange={(event) => {
              setFormValue((prev) => ({
                ...prev,
                bedroom: +event.target.value,
              }));
            }}
          />
        </div>
      </div>
      <div className="flex flex-col">
        <label htmlFor="bathroom" className="font-sans font-medium text-sm">
          Bathroom
        </label>
        <div className="flex items-center rounded-md bg-white px-2 py-1">
          <input
            id="bathrom"
            type="number"
            className="flex-1 outline-none py-1 px-2 rounded-md mt-1 mr-1"
            placeholder="1"
            value={formValue.bathroom}
            onChange={(event) => {
              setFormValue((prev) => ({
                ...prev,
                bathroom: +event.target.value,
              }));
            }}
          />
        </div>
      </div>
      <div className="flex flex-col">
        <label htmlFor="image" className="font-sans font-medium text-sm">
          Image
        </label>
        <div className="flex items-center rounded-md bg-white px-2 py-1">
          <input
            id="image"
            type="file"
            accept=".jpg, .jpeg, .png"
            className="flex-1 outline-none py-1 px-2 rounded-md mt-1 mr-1"
            onChange={(event) => {
              setFormValue((prev) => ({
                ...prev,
                files: event.target.files![0],
              }));
            }}
          />
        </div>
      </div>
      <div className="text-center">
        <button
          className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-indigo-500 hover:bg-indigo-400 transition ease-in-out duration-150 mt-7"
          type="submit"
        >
          {isLoading && (
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          )}
          {value ? "Update" : "Create"}
        </button>
      </div>
    </form>
  );
});

HouseForm.displayName = "HouseForm";
export default HouseForm;
