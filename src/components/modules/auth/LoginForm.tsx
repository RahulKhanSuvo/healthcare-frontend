import { ILogin, loginSchema } from "@/zod/auth.validation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";
import { loginAction } from "@/app/(common layout)/(auth)/login/_action";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AppField from "@/components/shared/form/Appfiled";

const LoginForm = () => {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: ILogin) => loginAction(payload),
  });
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      try {
        const result = await mutateAsync(value);
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome Back</CardTitle>
      </CardHeader>
      <CardDescription>Please enter your</CardDescription>
      <CardContent>
        <form
          method="POST"
          action="#"
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <form.Field
            name="email"
            validators={{ onChange: loginSchema.shape.password }}
          >
            {(field) => (
              <AppField
                field={field}
                label="Email"
                type="email"
                placeholder="Enter your email"
              />
            )}
          </form.Field>
          <form.Field
            name="password"
            validators={{ onChange: loginSchema.shape.password }}
          >
            {(field) => (
              <AppField
                field={field}
                label="Password"
                type="password"
                placeholder="Enter your password"
              />
            )}
          </form.Field>
        </form>
      </CardContent>
    </Card>
  );
};
export default LoginForm;
