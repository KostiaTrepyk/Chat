import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userAPI = createApi({
	reducerPath: "userAPI",
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/auth" }),
	endpoints: (build) => ({
		checkToken: build.query({
			query: (token: string | null) => ({
				url: "/checkToken",
				headers: {
					Authorization: "Bearer " + token,
				},
			}),
		}),
		singIn: build.mutation({
			query: (body: { email: string; password: string }) => ({
				url: "/signIn",
				method: "post",
				body: {
					username: body.email /* ??? WTF ??? */,
					password: body.password,
				},
			}),
		}),
		singUp: build.mutation({
			query: (body: { username: string; email: string; password: string }) => ({
				url: "/signUp",
				method: "post",
				body,
			}),
		}),
	}),
});
