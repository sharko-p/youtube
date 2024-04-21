import { useForm, SubmitHandler } from "react-hook-form";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
};

const FormLogin = () => {
  const { register, handleSubmit } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data);

  return ( <>
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("firstName")} />
      <input {...register("lastName")} />
      <input type="email" {...register("email")} />

      <button >Отправить</button>
    </form>
    </>
  );
};

export default FormLogin;


