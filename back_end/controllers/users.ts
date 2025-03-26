import { UserType } from "@/lib/utils";
import { error } from "console";
export const getUsers = () => {
  return [
    {
      username: "test",
      password: "pass123",
      email: "test@gmail.com",
    },
  ];
};

export const checkUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const users = await getUsers();
  const user = users.find((user: UserType) => user.email === email);

  if (!user) {
    return new Response(
      JSON.stringify({ message: "User not found", error: true }),
      { status: 404 }
    );
  }

  const isCorreect = user.password === password;

  if (!isCorreect) {
    return new Response(
      JSON.stringify({ message: "Password is incorrect", error: true }),
      { status: 404 }
    );
  }

  return new Response(JSON.stringify({ message: "amjilttai nevterlee" }), {
    status: 200,
  });
};
