import { Logo } from "./_components/logo"

const AuthLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <div className="h-full flex w-full justify-center items-center flex-col space-y-2">
        <Logo />
        <h2 className="font-bold text-xl">Twitch</h2>
        {children}
    </div>
  )
}

export default AuthLayout