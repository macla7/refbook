import Link from "next/link";
// import { getAllUsers } from "app/user/utils";
import { fetchAuthSession } from "aws-amplify/auth";
import { useState, useEffect } from "react";
import { User } from "app/types";
import { deleteUser, getUsers } from "app/api/users";
import UserCard from "./userCard";
import { useSearch } from "app/context/SearchContext";

export function UsersList() {
  const [users, setUsers] = useState<User[]>([]);
  const { search } = useSearch();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const session = await fetchAuthSession();
    setUsers(filterUsers(await getUsers(session), ""));
  }

  async function deleteAction(id) {
    const session = await fetchAuthSession();
    await deleteUser(session, id);
    fetchData();
  }

  function filterUsers(users, searchInput) {
    if (searchInput == "" || searchInput == null) return users;

    const lowerSearch = searchInput.toLowerCase();

    const filteredUsers = users.filter((user) => {
      return (
        user.name?.toLowerCase().includes(lowerSearch) ||
        //user.email?.toLowerCase().includes(lowerSearch) ||
        user.position?.toLowerCase().includes(lowerSearch) ||
        user.workplace?.toLowerCase().includes(lowerSearch)
      );
    });
    return filteredUsers;
  }

  useEffect(() => {
    filter();
  }, [search]);

  async function filter() {
    const session = await fetchAuthSession();
    setUsers(filterUsers(await getUsers(session), search));
  }

  return (
    <div>
      <ul className="flex flex-col items-center justify-center w-full divide-y-1 divide-solid divide-ourGold">
        {users.map((user) => (
          <li
            key={user.id}
            className="w-1/2 flex flex-col-3 p-2 bg-white md:flex-row hover:bg-ourCream"
          >
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
    </div>
  );
}
