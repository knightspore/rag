import { FormEvent, useState } from "react"
import Alert, { Level } from "./Alert"
import { useAuthContext } from "./provider/AuthContextProvider"

export default function SignIn() {

	const supabase = useAuthContext()
	const [loading, setLoading] = useState(false)
	const [errMsg, setErrMsg] = useState("")
	const [otpSent, setOtpSent] = useState(false)
	const [email, setEmail] = useState("")

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()
		try {
			setLoading(true)
			const { error } = await supabase.auth.signIn({ email })
			if (error) {
				setErrMsg(error.message)
			setOtpSent(false)
			} else {
				setOtpSent(true)
			}
		} catch (error) {
			setErrMsg((error as Error).message || JSON.stringify(error))
		} finally {
			setLoading(false)
		}
	}

	if (loading) {
		return <div className="m-auto">Loading...</div>
	}

	return (
		<div className="m-auto text-center">
			<form className="flex flex-col gap-2 mb-4 " onSubmit={handleSubmit}>
				<label htmlFor="email">Email</label>
				<input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
				<button type="submit">
					Sign In
				</button>
			</form>
			{errMsg && <Alert text={errMsg} level={Level.error} />}
			{otpSent && <Alert text="Magic Sign-in Link Sent! Check your Email." level={Level.info} />}
		</div>
	)
}