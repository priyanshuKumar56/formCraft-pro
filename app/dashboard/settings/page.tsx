"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { User, Bell, Shield, Palette, Globe, Mail } from "lucide-react"

export default function SettingsPage() {
    return (
        <div className="p-8 lg:p-12 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">

            <div className="flex flex-col gap-2 mb-10">
                <h1 className="text-3xl font-display font-bold text-slate-900 tracking-tight">Settings</h1>
                <p className="text-slate-500 font-medium">Manage your profile, preferences, and workspace settings.</p>
            </div>

            <Tabs defaultValue="profile" className="space-y-8">
                <TabsList className="bg-slate-100/50 p-1 h-14 rounded-2xl w-full max-w-md gap-1">
                    <TabsTrigger value="profile" className="h-12 rounded-xl text-xs font-bold uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:shadow-sm">Profile</TabsTrigger>
                    <TabsTrigger value="notifications" className="h-12 rounded-xl text-xs font-bold uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:shadow-sm">Notifications</TabsTrigger>
                    <TabsTrigger value="preferences" className="h-12 rounded-xl text-xs font-bold uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:shadow-sm">Preferences</TabsTrigger>
                </TabsList>

                <TabsContent value="profile" className="space-y-8 outline-none">
                    {/* Personal Info Card */}
                    <div className="bg-white border border-slate-200 rounded-[2rem] p-8 space-y-8 shadow-sm">
                        <div className="flex items-start justify-between">
                            <div>
                                <h2 className="text-xl font-bold text-slate-900 mb-1">Personal Information</h2>
                                <p className="text-sm font-medium text-slate-400">Update your photo and personal details.</p>
                            </div>
                            <Badge variant="outline" className="border-indigo-100 bg-indigo-50 text-indigo-600 font-bold px-3 py-1">PRO PLAN</Badge>
                        </div>

                        <Separator className="bg-slate-100" />

                        <div className="flex flex-col md:flex-row gap-8 items-start">
                            <div className="flex flex-col gap-4 items-center">
                                <Avatar className="h-32 w-32 border-4 border-slate-50 shadow-xl">
                                    <AvatarFallback className="bg-zinc-900 text-white text-2xl font-bold">PK</AvatarFallback>
                                </Avatar>
                                <Button variant="outline" size="sm" className="w-full font-bold text-xs">Change Photo</Button>
                            </div>

                            <div className="flex-1 grid gap-6 w-full">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="firstName" className="text-xs font-bold text-slate-500 uppercase tracking-widest">First Name</Label>
                                        <Input id="firstName" defaultValue="Priyanshu" className="h-12 border-slate-200 rounded-xl font-medium focus-visible:ring-indigo-500" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="lastName" className="text-xs font-bold text-slate-500 uppercase tracking-widest">Last Name</Label>
                                        <Input id="lastName" defaultValue="Kumar" className="h-12 border-slate-200 rounded-xl font-medium focus-visible:ring-indigo-500" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-xs font-bold text-slate-500 uppercase tracking-widest">Email Address</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                        <Input id="email" defaultValue="priyanshu@example.com" className="h-12 pl-11 border-slate-200 rounded-xl font-medium focus-visible:ring-indigo-500" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="bio" className="text-xs font-bold text-slate-500 uppercase tracking-widest">Bio</Label>
                                    <Input id="bio" placeholder="Tell us a little about yourself" className="h-12 border-slate-200 rounded-xl font-medium focus-visible:ring-indigo-500" />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end pt-4">
                            <Button className="h-12 px-8 bg-zinc-900 hover:bg-black text-white rounded-xl font-bold">Save Changes</Button>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="preferences" className="space-y-6 outline-none">
                    <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm">
                        <h2 className="text-xl font-bold text-slate-900 mb-6">Form Defaults</h2>

                        <div className="space-y-6">
                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-slate-200 text-slate-500">
                                        <Palette size={20} />
                                    </div>
                                    <div>
                                        <span className="block font-bold text-slate-900 text-sm">Default Theme</span>
                                        <span className="block text-xs font-medium text-slate-400">Apply standard branding to new forms automatically</span>
                                    </div>
                                </div>
                                <Switch />
                            </div>

                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-slate-200 text-slate-500">
                                        <Shield size={20} />
                                    </div>
                                    <div>
                                        <span className="block font-bold text-slate-900 text-sm">Spam Protection</span>
                                        <span className="block text-xs font-medium text-slate-400">Enable reCAPTCHA on all new forms</span>
                                    </div>
                                </div>
                                <Switch defaultChecked />
                            </div>

                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-slate-200 text-slate-500">
                                        <Globe size={20} />
                                    </div>
                                    <div>
                                        <span className="block font-bold text-slate-900 text-sm">Language</span>
                                        <span className="block text-xs font-medium text-slate-400">Default language for form labels</span>
                                    </div>
                                </div>
                                <Button variant="outline" size="sm" className="font-bold text-xs h-8">English (US)</Button>
                            </div>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="notifications" className="space-y-6 outline-none">
                    <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm">
                        <h2 className="text-xl font-bold text-slate-900 mb-1">Email Notifications</h2>
                        <p className="text-sm font-medium text-slate-400 mb-8">Choose when and how we should contact you.</p>

                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="n1" className="font-bold text-slate-700">New Form Submission</Label>
                                <Switch id="n1" defaultChecked />
                            </div>
                            <Separator />
                            <div className="flex items-center justify-between">
                                <Label htmlFor="n2" className="font-bold text-slate-700">Weekly Summary</Label>
                                <Switch id="n2" />
                            </div>
                            <Separator />
                            <div className="flex items-center justify-between">
                                <Label htmlFor="n3" className="font-bold text-slate-700">Product Updates</Label>
                                <Switch id="n3" defaultChecked />
                            </div>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
