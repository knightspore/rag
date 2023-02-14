import Head from "next/head"
import { FormEvent, useState } from "react"
import { supabase } from "../../lib/supabase"
import Alert, { Level } from "../App/Alert"

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
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="p-4 m-auto text-center">
					<form className="flex flex-col my-4 space-y-2" onSubmit={handleSubmit}>
            <label>
              <div className="mb-4">
              <h1 className="text-3xl font-bold text-slate-200">🗞️ Welcome to RAG</h1>
              </div>
						<input placeholder="you@who.co" type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="text-center" />
            </label>
            <div className="pt-2">
							<button type="submit" className="mx-auto text-lg">
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
