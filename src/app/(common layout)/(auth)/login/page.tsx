import LoginForm from "@/components/modules/auth/LoginForm";
interface LoginParams {
  searchParams: Promise<{ rediract?: string }>;
}
export default async function LoginPage({ searchParams }: LoginParams) {
  const params = await searchParams;
  const redirectPath = params.rediract;
  return (
    <div className="flex justify-center items-center">
      <LoginForm redirectPath={redirectPath} />
    </div>
  );
}
