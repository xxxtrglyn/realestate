import { House } from "@prisma/client";
import axios from "axios";
import { GetServerSideProps, NextPage } from "next";
import React, { useEffect, useRef, useState } from "react";
import Header from "../../components/home/header";
import HouseForm, { loading } from "../../components/home/houseform";
import Land from "../../components/home/land";
import { BaseURL } from "../../lib/axiosinstance";

type houseForm = {
  square: number;
  price: number;
  bedroom: number;
  bathroom: number;
  files?: File | null;
};

const House: NextPage<{ allHouses: House[] }> = ({ allHouses }) => {
  const [isShowNewHouseForm, setIsShowNewHouseForm] = useState<boolean>(false);
  const [value, setValue] = useState<House[]>(allHouses || []);
  const [isSelected, setIsSelected] = useState<string>("");
  const [isDeleteMode, setIsDeleteMode] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<string>("");
  const ref = useRef<loading>(null);

  const createNewHouse = async (formValue: houseForm) => {
    const avatarFile = new FormData();
    avatarFile.append("file", formValue.files!);
    avatarFile.append("upload_preset", "user_avatar");
    avatarFile.append("cloud_name", "dvmih2q1y");
    axios
      .post("https://api.cloudinary.com/v1_1/dvmih2q1y/upload", avatarFile)
      .then((res) => {
        BaseURL.post("/api/house", {
          square: formValue.square,
          price: formValue.price,
          bedroom: formValue.bedroom,
          bathroom: formValue.bathroom,
          image: res.data.url,
        })
          .then((res) => {
            setValue((prev) => prev.concat(res.data));
          })
          .catch((e) => {
            console.log(e);
          });
        ref.current?.setloading();
      });
  };
  const updateHouse = async (formValue: houseForm) => {
    if (formValue.files) {
      const avatarFile = new FormData();
      avatarFile.append("file", formValue.files!);
      avatarFile.append("upload_preset", "user_avatar");
      avatarFile.append("cloud_name", "dvmih2q1y");
      axios
        .post("https://api.cloudinary.com/v1_1/dvmih2q1y/upload", avatarFile)
        .then((res) => {
          BaseURL.put(`/api/house/${isSelected}`, {
            square: formValue.square,
            price: formValue.price,
            bedroom: formValue.bedroom,
            bathroom: formValue.bathroom,
            image: res.data.url,
          })
            .then((res) => {
              setValue((prev) =>
                prev.map((house) => {
                  if (house.id !== isSelected) {
                    return house;
                  } else {
                    return { ...res.data };
                  }
                })
              );
            })
            .catch((e) => {
              console.log(e);
            });
          ref.current?.setloading();
        });
    } else {
      BaseURL.put(`/api/house/${isSelected}`, {
        square: formValue.square,
        price: formValue.price,
        bedroom: formValue.bedroom,
        bathroom: formValue.bathroom,
      })
        .then((res) => {
          setValue((prev) =>
            prev.map((house) => {
              if (house.id !== isSelected) {
                return house;
              } else {
                return { ...res.data };
              }
            })
          );
        })
        .catch((e) => {
          console.log(e);
        });
      ref.current?.setloading();
    }
  };
  const deleteHouse = () => {
    BaseURL.delete(`/api/house/${deleteId}`)
      .then((res) => {
        setValue((prev) => prev.filter((house) => house.id !== deleteId));
        setDeleteId("");
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    if (isShowNewHouseForm || isSelected) {
      document.body.style.overflowY = "scroll";
      document.body.style.position = "fixed";
    } else {
      document.body.style.position = "unset";
    }
  }, [isShowNewHouseForm, isSelected]);
  return (
    <>
      <Header />
      <div className="m-2 flex justify-center gap-2">
        <button
          className="border border-solid p-2 bg-lime-400 rounded-lg font-sans font-medium text-white motion-safe:hover:scale-105"
          onClick={() => {
            setIsShowNewHouseForm(true);
          }}
        >
          New House
        </button>
        <button
          className="border border-solid p-2 bg-red-600 rounded-lg font-sans font-medium text-white motion-safe:hover:scale-105"
          onClick={() => {
            setIsDeleteMode((prev) => !prev);
          }}
        >
          Delete
        </button>
      </div>
      <div
        className={
          isDeleteMode
            ? "flex flex-wrap gap-5 h-4/5 justify-center p-5 bg-red-200"
            : "flex flex-wrap gap-5 h-4/5 justify-center p-5"
        }
      >
        {value.map((house) => (
          <Land
            key={house.id}
            value={house}
            onSeeDetail={
              isDeleteMode
                ? () => {
                    setDeleteId(house.id);
                  }
                : () => {
                    setIsSelected(house.id);
                  }
            }
          />
        ))}
      </div>
      <div
        className={
          isShowNewHouseForm
            ? "bg-black fixed top-0 right-0 w-screen h-screen bg-opacity-50 z-[60] transition-all"
            : "fixed w-screen h-screen bg-opacity-50 hidden transition-all"
        }
        onClick={() => {
          setIsShowNewHouseForm(false);
        }}
      >
        <div
          className="bg-neutral-100 relative top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] inline-block p-8 rounded-lg"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <HouseForm onSubmit={createNewHouse} ref={ref} />
        </div>
      </div>
      <div
        className={
          deleteId
            ? "bg-black fixed top-0 right-0 w-screen h-screen bg-opacity-50 z-[60] transition-all"
            : "fixed w-screen h-screen bg-opacity-50 hidden transition-all"
        }
      >
        <div
          className="bg-neutral-100 relative top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] inline-block p-8 rounded-lg"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <h2 className="text-lg font-bold text-center">Confirm</h2>
          <span>Delete this house permantenly ?</span>
          <div className="text-center">
            <button
              className="mx-1 inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-red-500 hover:bg-red-400 transition ease-in-out duration-150 mt-7"
              onClick={deleteHouse}
            >
              Yes
            </button>
            <button
              className="mx-1 inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-indigo-500 hover:bg-indigo-400 transition ease-in-out duration-150 mt-7"
              onClick={() => {
                setDeleteId("");
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
      <div
        className={
          isSelected
            ? "bg-black fixed top-0 right-0 w-screen h-screen bg-opacity-50 z-[60] transition-all"
            : "fixed w-screen h-screen bg-opacity-50 hidden transition-all"
        }
        onClick={() => {
          setIsSelected("");
        }}
      >
        <div
          className="bg-neutral-100 relative top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] inline-block p-8 rounded-lg"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {isSelected && (
            <HouseForm
              value={value.find((house) => house.id === isSelected)}
              onSubmit={updateHouse}
              ref={ref}
            />
          )}
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const res = await BaseURL.get("/api/house", {
    headers: {
      cookie: req.headers.cookie || "",
    },
  });
  console.log(res.data);
  const data: House[] = res.data;
  return {
    props: { allHouses: data },
  };
};

export default House;
