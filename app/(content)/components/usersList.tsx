import Link from "next/link";
// import { getAllUsers } from "app/user/utils";
import { fetchAuthSession } from "aws-amplify/auth";
import { useState, useEffect } from "react";
import { User } from "app/types";
import { deleteUser, getUsers } from "app/api/users";

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
    <ul>
      {users.map((user) => (
        <li key={user.id} className="p-2 mb-4 bg-white rounded-md">
          <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2 justify-between ">
            <Link href={`/users/${user.id}/profile`}>
              <p className="w-[50] tabular-nums">{user.name}</p>
              <p className="w-[50] tabular-nums">{user.email}</p>
            </Link>
            <button
              type="submit"
              className="rounded-md bg-our-pink px-3 py-2 text-sm font-semibold shadow-xs hover:bg-our-cyan focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={() => deleteAction(user.id)}
            >
              delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
