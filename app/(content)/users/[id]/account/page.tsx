"use client";

import { useState, useEffect } from "react";
import { fetchAuthSession } from "aws-amplify/auth";
import { User } from "app/types";
import { userDefault } from "app/defaults/user";
import { deleteUser, getUser, patchUser } from "app/api/users";
import { patchFetch } from "next/dist/server/app-render/entry-base";

export default function Page({ params }: { params: { id: string } }) {
  const [user, setUser] = useState<User>(userDefault);
  const [name, setName] = useState("");

  const userId: string = params.id;


  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const session = await fetchAuthSession();
      setUser(await getUser(session, userId));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function handleClick() {
    const session = await fetchAuthSession();
    
        let userParams = {
          ...params,
          name: name,
        };
        console.log("bingo");
        console.log(userParams);
        patchUser(session,userId, params);

  }

  return (
    <div className="bg-white w-full">
      <h2 className="text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight m-10">
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>Position: {user.postion}</p>
        <p>Workplace: {user.workplace}</p>
        <p>Bio: {user.bio}</p>
      </h2>
      <form className="flex flex-col m-10">
        <label>Enter new name:</label>
        <input type="text" id="inputBox" name="inputBox" required  className="w-fit"/>
        <button type="submit" onClick={handleClick} className=" w-1/10 rounded-sm bg-ourGold px-3 py-2 my-2 text-sm font-semibold shadow-xs  
        hover:bg-egBlue hover:text-white">Submit</button>
    </form>
    </div>
  );
}
