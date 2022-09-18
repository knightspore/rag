import { useAuthContext } from "./provider/AuthContextProvider"
import { useUserContext } from "./provider/UserContextProvider"

export default function SignIn() {

	const [loading, setLoading] = useState(false)
	const [errMsg, setErrMsg] = useState("")

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()
		try {
			setLoading(true)
			const email = e.target?.email.value
			const { error } = await supabase.auth.signIn({ email })
			if (error) setErrMsg(error.message)
		} catch (error) {
			setErrMsg(error.message || JSON.stringify(error))
		} finally {
			setLoading(false)
		}
	}
	return (
		<div className="m-auto">
		<form className="flex flex-col gap-2" onSubmit={handleSubmit}>
			<label htmlFor="email">Email</label>
			<input type="email" name="email" id="email" />
			<input type="submit" value="Sign In" className="text-slate-50" />
		</form>
		</div>
	)
}