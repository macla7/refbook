export async function putTestimonial(session, formParams) {
  try {
    // 🔥 Fetch the authentication session

    const jwtToken = session.tokens?.idToken?.toString();

    if (!jwtToken) {
      console.error("No authentication token found.");
      return;
    }

    // 🔥 Decode the JWT Token to extract the Cognito User ID (sub)
    const tokenPayload = JSON.parse(atob(jwtToken.split(".")[1])); // Decode JWT payload
    const userId = tokenPayload.sub; // Cognito User ID (Unique ID for the user)

    // 🔥 Send PUT request with AuthorId set to the user's Cognito ID
    const response = await fetch(
      String(process.env.NEXT_PUBLIC_API_GATEWAY_INVOKE) + "/testimonials",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify({
          message: formParams.message,
          subjectUserId: formParams.subjectUserId, // Example: ID of the person the testimonial is about
          authorId: userId, // ✅ Automatically assign the user's Cognito ID
        }),
      }
    );

    const data = await response.json();
    console.log("response from server:", data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export async function getTestimonials(session, userId) {
  try {
    const jwtToken = session.tokens?.idToken?.toString(); // Use ID token

    if (!userId) {
      console.error("User ID is missing from the path.");
      return [];
    }

    const response = await fetch(
      `${String(
        process.env.NEXT_PUBLIC_API_GATEWAY_INVOKE
      )}/testimonials?subjectUserId=${encodeURIComponent(userId)}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("response from server:", data);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

export async function deleteTestimonial(session, id) {
  try {
    const jwtToken = session.tokens?.idToken?.toString(); // Use ID token

    const response = await fetch(
      String(process.env.NEXT_PUBLIC_API_GATEWAY_INVOKE) +
        `/testimonials/${id}`,
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
