import Head from "next/head"
import Image from "next/image"
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
      <div className="w-screen h-screen grid lg:grid-cols-4">
        <div className="col-span-1"/>
        <div className="w-full px-4 m-auto lg:col-span-1 col-span-2">
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
        <div className="flex items-center select-none col-span-2">
          <Image className="lg:translate-y-12" src="/home_hero.png" alt="Hero Image" width={690} height={773} placeholder="blur" blurDataURL="/home_hero.png" />
        </div>
			</div>
		</>
	)
}
