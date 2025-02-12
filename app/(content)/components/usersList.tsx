import Link from "next/link";
// import { getAllUsers } from "app/user/utils";
import { fetchAuthSession } from "aws-amplify/auth";
import { useState, useEffect } from "react";
import { User } from "app/types";

export function UsersList() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const session = await fetchAuthSession();
      const jwtToken = session.tokens?.idToken?.toString(); // Use ID token

      console.log("sessssssion issss :", session);
      console.log("jwtToken issss :", jwtToken);
      const response = await fetch(
<<<<<<< HEAD
        String(process.env.NEXT_PUBLIC_API_GATEWAY_INVOKE) + "/users",
=======
        "https://khgvbo341f.execute-api.ap-southeast-2.amazonaws.com/users",
>>>>>>> 3276f26 (testimonials fuck around)
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      const data = await response.json();
      setUsers(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  // async function deleteUser(id) {
  //   try {
  //     const session = await fetchAuthSession();
  //     const jwtToken = session.tokens?.idToken?.toString(); // Use ID token

  //     console.log("sessssssion issss :", session);
  //     console.log("jwtToken issss :", jwtToken);
  //     const response = await fetch(
  //       `https://khgvbo341f.execute-api.ap-southeast-2.amazonaws.com/users/${id}`,
  //       {
  //         method: "DELETE",
  //         headers: {
  //           Authorization: `Bearer ${jwtToken}`,
  //         },
  //       }
  //     );

  //     const data = await response.json();
  //     setUsers(data);
  //     console.log(data);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // }

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          <Link
            className="flex flex-col space-y-1 mb-4"
            href={`/users/${user.id}`}
          >
            <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2 justify-between">
              <p className="w-[100px] tabular-nums">{user.email}</p>
              <p className="tracking-tight">{user.id}</p>
            </div>
          </Link>
          {/* <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() => deleteUser(user.id)}
          >
            delete
          </button> */}
        </li>
      ))}
    </ul>
  );
}
