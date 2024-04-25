"use client"
import { useState } from 'react';
import { TabsTrigger, TabsList, TabsContent, Tabs } from '../components/ui/tabs';
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from '../components/ui/card';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { DialogTrigger, DialogTitle, DialogDescription, DialogHeader, DialogFooter, DialogContent, Dialog } from '../components/ui/dialog';
import Link from 'next/link';

export default function Auth() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [phone, setPhone] = useState('');
	const [otp, setOtp] = useState('');
	const [isOtpDialogOpen, setIsOtpDialogOpen] = useState(false);

	const handleSendResetCode = () => {
		// Here you can add the logic to send the reset code to the phone number
		// If the phone number is matched and the OTP is received, open the OTP dialog
		setIsOtpDialogOpen(true);
	};

	return (
		<main className="flex min-h-[calc(100vh)] items-center justify-center bg-gray-800 bg-[url('/authbg.png')] bg-cover px-4">
			<div className="w-full max-w-md space-y-6">
				<Tabs className="w-full" defaultValue="login">
					<TabsList className="grid w-full grid-cols-2 bg-gray-400">
						<TabsTrigger value="login">Login</TabsTrigger>
						<TabsTrigger value="signup">Sign Up</TabsTrigger>
					</TabsList>
					<TabsContent value="login">
						<Card>
							<CardHeader>
								<CardTitle>Welcome back</CardTitle>
								<CardDescription>Enter your email and password to access your account.</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="space-y-2">
									<Label htmlFor="email">Email</Label>
									<Input id="email" placeholder="name@example.com" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
								</div>
								<div className="space-y-2">
									<Label htmlFor="password">Password</Label>
									<Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
								</div>
							</CardContent>
							<CardFooter className="flex items-center justify-between">
								<Button type="submit">Sign in</Button>
								<Dialog>
									<DialogTrigger asChild>
										<Link href="#" className="text-sm text-gray-500 hover:underline dark:text-gray-400">Forgot password?</Link>
									</DialogTrigger>
									<DialogContent className="sm:max-w-[425px]">
										<DialogHeader>
											<DialogTitle>Reset your password</DialogTitle>
											<DialogDescription>Enter your phone number and we'll send you a code to reset your password.</DialogDescription>
										</DialogHeader>
										<div className="grid gap-4 py-4">
											<div className="grid grid-cols-4 items-center gap-4">
												<Label className="text-right" htmlFor="phone">Phone</Label>
												<Input className="col-span-3" id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
											</div>
										</div>
										<DialogFooter>
											<Button type="submit" onClick={handleSendResetCode}>Send reset code</Button>
										</DialogFooter>
									</DialogContent>
								</Dialog>
							</CardFooter>
						</Card>
					</TabsContent>
					<TabsContent value="signup">
						<Card>
							<CardHeader>
								<CardTitle>Create an account</CardTitle>
								<CardDescription>Enter your details to get started.</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="space-y-2">
									<Label htmlFor="name">Name</Label>
									<Input id="name" placeholder="John Doe" />
								</div>
								<div className="space-y-2">
									<Label htmlFor="email">Email</Label>
									<Input id="email" placeholder="name@example.com" type="email" />
								</div>
								<div className="space-y-2">
									<Label htmlFor="password">Password</Label>
									<Input id="password" type="password" />
								</div>
							</CardContent>
							<CardFooter>
								<Button type="submit">Sign up</Button>
							</CardFooter>
						</Card>
					</TabsContent>
				</Tabs>
			</div>

			{isOtpDialogOpen && (
				<Dialog>
					<DialogContent className="sm:max-w-[425px]">
						<DialogHeader>
							<DialogTitle>Enter The OTP</DialogTitle>
						</DialogHeader>
						<div className="grid gap-4 py-4">
							<div className="grid grid-cols-4 items-center gap-4">
								<Label className="text-right" htmlFor="otp">OTP</Label>
								<Input className="col-span-3" id="otp" type="tel" value={otp} onChange={(e) => setOtp(e.target.value)} />
							</div>
						</div>
						<DialogFooter>
							<Button type="submit">Verify OTP</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			)}
		</main>
	);
}