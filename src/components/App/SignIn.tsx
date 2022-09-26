import { FormEvent, useState } from "react"
import { supabase } from "../../lib/supabase"
import Alert, { Level } from "./Alert"

export default function SignIn() {

	const [loading, setLoading] = useState(false)
	const [errMsg, setErrMsg] = useState("")
	const [otpSent, setOtpSent] = useState(false)
	const [email, setEmail] = useState("")

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()
		setErrMsg("")
		try {
			setLoading(true)
			const { error } = await supabase.auth.signInWithOtp({ email, options: {
				emailRedirectTo: window.location.origin,
			} })
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

	return (
		<div className="m-auto text-center">
			<form className="flex flex-col gap-2 mb-4 " onSubmit={handleSubmit}>
				<label htmlFor="email">Email</label>
				<input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
				<button type="submit">
					Sign In
				</button>
			</form>
			{loading && <Alert text="Loading..." level={Level.info} />}
			{errMsg && <Alert text={errMsg} level={Level.error} />}
			{otpSent && <Alert text="Magic Sign-in Link Sent! Check your Email." level={Level.info} />}
		</div>
	)
}
