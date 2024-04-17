import { ExtendedUser } from "@/next-auth";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";

interface UserInfoProps {
    user?: ExtendedUser;
    label: string;
}

export const UserInfo = ({ user, label }: UserInfoProps) => {

    return (
        <Card className="w-[600px] shadow-md ">
            <CardHeader>
                <p className="text-2xl font-semibold text-center">{label}</p>
            </CardHeader>
            <CardContent>
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <p className="text-sm font-medium">
                        ID
                    </p>
                    <p className="truncate text-xs font-mono max-w-[180px] p-1 bg-slate-100 rounded-md">
                        {user?.id}
                    </p>
                </div>
            </CardContent>
            <CardContent>
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <p className="text-sm font-medium">
                        Name
                    </p>
                    <p className="truncate text-xs font-mono max-w-[180px] p-1 bg-slate-100 rounded-md">
                        {user?.name}
                    </p>
                </div>
            </CardContent>
            <CardContent>
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <p className="text-sm font-medium">
                        Email
                    </p>
                    <p className="truncate text-xs font-mono max-w-[180px] p-1 bg-slate-100 rounded-md">
                        {user?.email}
                    </p>
                </div>
            </CardContent>
            <CardContent>
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <p className="text-sm font-medium">
                        Role
                    </p>
                    <p className="truncate text-xs font-mono max-w-[180px] p-1 bg-slate-100 rounded-md">
                        {user?.role}
                    </p>
                </div>
            </CardContent>
            <CardContent>
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <p className="text-sm font-medium">
                        Two Factor Authentication
                    </p>
                    {/* <p className="truncate text-xs font-mono max-w-[180px] p-1 bg-slate-100 rounded-md">
                    </p> */}
                    <Badge variant={user?.isTwoFactorEnabled ? "success" : "destructive"}>
                        {user?.isTwoFactorEnabled ? "ON" : "OFF"}
                    </Badge>
                </div>
            </CardContent>
        </Card>
    )
}