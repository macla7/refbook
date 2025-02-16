export async function getUsers(session) {
  try {
    const jwtToken = session.tokens?.idToken?.toString(); // Use ID token

    if (!jwtToken) {
      console.error("No authentication token found.");
      return;
    }

    const response = await fetch(
      String(process.env.NEXT_PUBLIC_API_GATEWAY_INVOKE) + "/users",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    );

    const data = await response.json();
    console.log("response from server:", data);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

export async function deleteUser(session, id) {
  try {
    const jwtToken = session.tokens?.idToken?.toString(); // Use ID token

    if (!jwtToken) {
      console.error("No authentication token found.");
      return;
    }

    const response = await fetch(
      `https://khgvbo341f.execute-api.ap-southeast-2.amazonaws.com/users/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    );

    const data = await response.json();
    console.log("response from server:", data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export async function getUser(session, userId) {
  try {
    const jwtToken = session.tokens?.idToken?.toString();

    if (!jwtToken) {
      console.error("No authentication token found.");
      return;
    }

    const response = await fetch(
      String(process.env.NEXT_PUBLIC_API_GATEWAY_INVOKE) + `/users/${userId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    );

    const data = await response.json();
    console.log("response from server:", data);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return {};
  }
}
