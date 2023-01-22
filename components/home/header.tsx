import {
  IconBrandFacebook,
  IconBrandGoogle,
  IconBrandInstagram,
  IconHome,
  IconLogout,
  IconTruckDelivery,
  IconUser,
} from "@tabler/icons";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Header = () => {
  const [tab, setTab] = useState<number>(0);
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const { data: session, status } = useSession();

  const headerTags = ["Search", "About", "Help"];
  const headerItems = headerTags.map((item, index) => (
    <li
      key={index}
      onClick={() => {
        setTab(index);
      }}
    >
      <a
        className={
          tab === index
            ? "text-sky-600 border-b-2 border-sky-600 font-medium cursor-pointer hover:text-sky-600 hover:border-b-2 hover:border-sky-600 transition-all"
            : "font-medium cursor-pointer hover:text-sky-600 hover:border-b-2 hover:border-sky-600"
        }
      >
        {item}
      </a>
    </li>
  ));

  const closeModal = () => {
    setIsShowModal(false);
  };

  const router = useRouter();

  useEffect(() => {
    if (isShowModal) {
      document.body.style.overflowY = "scroll";
      document.body.style.position = "fixed";
    }
  }, [isShowModal]);
  return (
    <header className="flex justify-between px-8 py-3 bg-white items-center">
      <div
        className="cursor-pointer"
        onClick={() => {
          router.push("/");
        }}
      >
        <span className="font-bold italic">Estate</span>
      </div>
      <ul className="flex gap-x-12">{headerItems}</ul>
      <div className="relative">
        {status === "authenticated" ? (
          <div className="group relative">
            <Image
              src={session?.user?.image!}
              alt="avatar"
              width={32}
              height={32}
              className="rounded-full object-cover h-8 w-8 shadow-md cursor-pointer"
            />
            <div className="group-hover:block bg-white absolute right-[calc(100%-32px)] top-[calc(100%+10px)] z-[51] rounded-lg shadow-lg after:content-[''] after:h-[10px] after:w-full after:absolute after:top-[-10px] after:z-[54] hidden">
              <div className="flex items-center gap-1 pl-3 py-2 pr-4 hover:bg-gray-300 rounded-t-lg cursor-pointer">
                <IconUser />
                <span>Setting</span>
              </div>
              <div
                className="flex items-center gap-1 pl-3 py-2 pr-4 hover:bg-gray-300 cursor-pointer"
                onClick={() => {
                  router.push("/house");
                }}
              >
                <IconHome />
                <span>Houses</span>
              </div>
              <div
                className="flex items-center gap-1 pl-3 py-2 pr-4 hover:bg-gray-300 cursor-pointer"
                onClick={() => {
                  router.push("/orders");
                }}
              >
                <IconTruckDelivery />
                <span>Orders</span>
              </div>
              <div
                className="flex items-center gap-1 pl-3 py-2 pr-2 rounded-b-lg hover:bg-gray-300 cursor-pointer"
                onClick={() => {
                  signOut();
                }}
              >
                <IconLogout />
                <span>Log Out</span>
              </div>
            </div>
          </div>
        ) : (
          <button
            className="text-md border boder-solid px-2 rounded-md bg-cyan-600 font-medium text-white py-1 shadow-md motion-safe:hover:scale-110 transition-all"
            onClick={() => {
              setIsShowModal(true);
            }}
          >
            Sign In
          </button>
        )}
      </div>
      <div
        className={
          isShowModal
            ? "bg-black fixed top-0 right-0 w-screen h-screen bg-opacity-50 z-[60]"
            : "fixed w-screen h-screen bg-opacity-50 hidden"
        }
        onClick={closeModal}
      >
        <div className="bg-neutral-100 relative top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] inline-block p-8 rounded-lg">
          <div
            className="flex gap-2 border border-solid rounded-md w-60 p-2 bg-white shadow-md mt-2 cursor-pointer motion-safe:hover:scale-105 transition-all"
            onClick={(e) => {
              e.stopPropagation();
              signIn("google");
            }}
          >
            <IconBrandGoogle color="red" />
            <span className="font-medium">Continue with Google</span>
          </div>
          <div className="flex gap-2 border border-solid rounded-md w-60 p-2 bg-white shadow-md mt-2 cursor-pointer motion-safe:hover:scale-105 transition-all">
            <IconBrandFacebook color="blue" />
            <span className="font-medium">Continue with Facebook</span>
          </div>
          <div className="flex gap-2 border border-solid rounded-md w-60 p-2 bg-white shadow-md mt-2 cursor-pointer motion-safe:hover:scale-105 transition-all">
            <IconBrandInstagram color="orange" />
            <span className="font-medium">Continue with Instagram</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
