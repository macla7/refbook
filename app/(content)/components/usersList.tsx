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
        <li key={user.id}>
          <Link
            className="flex flex-col space-y-1 mb-4"
            href={`/users/${user.id}`}
          >
            <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2 justify-between">
              <p className="w-[50] tabular-nums">{user.name}</p>
              <p className="w-[50] tabular-nums">{user.email}</p>
              <p className="tracking-tight">{user.id}</p>
            </div>
          </Link>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() => deleteAction(user.id)}
          >
            delete
          </button>
        </li>
      ))}
    </ul>
  );
}
