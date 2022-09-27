import Head from "next/head"
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
			<div className="flex flex-col w-screen h-screen">
				<div className="m-auto space-y-4 text-center">
					<h1 className="text-2xl font-bold text-transparent uppercase bg-clip-text bg-gradient-to-b from-slate-700 to-slate-900">RAG Login</h1>
					<form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
						<label htmlFor="email">Email</label>
						<input placeholder="you@who.com" type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="text-center" />
						<div className="text-center">
							<button type="submit">
								Get Sign-In Link
							</button>
						</div>
					</form>
					{loading && <Alert text="Loading..." level={Level.info} />}
					{errMsg && <Alert text={errMsg} level={Level.error} />}
					{otpSent && <Alert text="Magic Sign-in Link Sent! Check your Email." level={Level.info} />}
				</div>
			</div>
		</>
	)
}
