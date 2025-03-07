import Link from "next/link";
// import { getAllUsers } from "app/user/utils";
import { fetchAuthSession } from "aws-amplify/auth";
import { useState, useEffect } from "react";
import { User } from "app/types";
import { deleteUser, getUsers } from "app/api/users";
import UserCard from "./userCard";

export function UsersList() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const session = await fetchAuthSession();
    setUsers(await getUsers(session));
  }

  async function deleteAction(id) {
    const session = await fetchAuthSession();
    await deleteUser(session, id);
    fetchData();
  }

  return (
    <ul className="flex flex-col items-center justify-center w-full divide-y-1 divide-solid divide-ourGold">
      {users.map((user) => (
        <li key={user.id} className="w-1/2 flex flex-col-3 p-2 bg-white md:flex-row hover:bg-ourGold">
          <div className="">
            <Link href={`/users/${user.id}/profile`}>
              <UserCard user={user} />
            </Link>
            {/* <button
              type="submit"
              className="rounded-sm bg-our-pink px-3 py-2 text-sm font-semibold shadow-xs hover:bg-our-nav focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={() => deleteAction(user.id)}
            >
              delete
            </button> */}
          </div>
        </li>
      ))}
    </ul>
  );
}
