export async function getUsers() {
  try {
    const response = await fetch(
      String(process.env.NEXT_PUBLIC_API_GATEWAY_INVOKE) + "/users",
      {
        method: "GET",
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
      String(process.env.NEXT_PUBLIC_API_GATEWAY_INVOKE) + `/users/${id}`,
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

export async function getUser(userId) {
  try {
    const response = await fetch(
      String(process.env.NEXT_PUBLIC_API_GATEWAY_INVOKE) + `/users/${userId}`,
      {
        method: "GET",
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

export async function patchUser(session, userId, patch) {
  try {
    const jwtToken = session.tokens?.idToken?.toString();

    if (!jwtToken) {
      console.error("No authentication token found.");
      return;
    }

    console.log("PATCH request payload:", JSON.stringify(patch));
    console.log(
      "PATCH URL:",
      `${process.env.NEXT_PUBLIC_API_GATEWAY_INVOKE}/users/${userId}/account`
    );

    const response = await fetch(
      String(process.env.NEXT_PUBLIC_API_GATEWAY_INVOKE) +
        `/users/${userId}/account`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          // "Content-Type": "application/json",
        },
        body: JSON.stringify(patch),
      }
    );

    const data = await response.json();
    console.log("response from server:", data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export async function uploadProfileImage(
  selectedFile: File,
  session: any
): Promise<string | null> {
  try {
    const jwtToken = session.tokens?.idToken?.toString();
    if (!jwtToken) {
      console.error("No JWT token found.");
      return null;
    }

    const res = await fetch(
      String(process.env.NEXT_PUBLIC_API_GATEWAY_INVOKE) +
        "/generate-presigned-url",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`, // ✅ Include the token
        },
        body: JSON.stringify({
          fileName: selectedFile.name,
          fileType: selectedFile.type,
        }),
      }
    );

    if (!res.ok) {
      console.error("Failed to get presigned URL", await res.text());
      return null;
    }

    const { uploadUrl, imageUrl } = await res.json();

    const uploadRes = await fetch(uploadUrl, {
      method: "PUT",
      headers: { "Content-Type": selectedFile.type },
      body: selectedFile,
    });

    if (!uploadRes.ok) {
      console.error("Failed to upload file to S3", await uploadRes.text());
      return null;
    }

    return imageUrl; // ✅ This is the S3 public URL to save in user profile
  } catch (error) {
    console.error("Error uploading image:", error);
    return null;
  }
}
