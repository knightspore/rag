import Head from "next/head"
import { FormEvent, useState } from "react"
import { supabase } from "./lib/supabase"
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
			const { error } = await supabase.auth.signInWithOtp({
				email, options: {
					emailRedirectTo: window.location.origin,
				}
			})
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
		<>
			<Head>
				<title>Sign-In - RAG</title>
			</Head>
			<div className="flex flex-col items-center w-screen h-screen">
				<div className="m-auto w-96">
					<form className="flex flex-col space-y-2" onSubmit={handleSubmit}>
            <label htmlFor="email">
              <h1 className="mb-2 text-lg">Login</h1>
            </label>
						<input placeholder="you@who.com" type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="text-center" />
							<button type="submit">
								Get Sign-In Link
							</button>
					</form>
					{loading && <Alert text="Loading..." level={Level.info} />}
					{errMsg && <Alert text={errMsg} level={Level.error} />}
					{otpSent && <Alert text="Magic Sign-in Link Sent! Check your Email." level={Level.info} />}
				</div>
			</div>
		</>
	)
}
