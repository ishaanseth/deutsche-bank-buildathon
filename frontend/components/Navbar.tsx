"use client";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Landmark, Bell, HelpCircle, Settings } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import SearchBar from "@/components/search-component";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b sticky top-0 left-0 bg-background">
      {/* Logo and Title with aria-label for navigation */}
      <div
        className="flex items-center space-x-4 cursor-pointer"
        onClick={() => {
          router.push("/");
        }}
        aria-label="Navigate to Dashboard"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && router.push("/")}
      >
        <Landmark className="h-8 w-8" />
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>

      {/* Navigation buttons with appropriate aria-labels */}
      <div className="flex items-center space-x-4">
        <SearchBar />
        
        <Button size="icon" variant="ghost" aria-label="Notifications">
          <Bell className="h-5 w-5" />
        </Button>
        
        <Button size="icon" variant="ghost" aria-label="Help and Support">
          <HelpCircle className="h-5 w-5" />
        </Button>
        
        <Button size="icon" variant="ghost" aria-label="Settings">
          <Settings className="h-5 w-5" />
        </Button>

        {/* Avatar with descriptive alt text */}
        <Avatar>
          <AvatarImage
            alt="User Avatar"
            src="/placeholder-user.jpg"
          />
          <AvatarFallback aria-label="User Initials">JD</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default Navbar;
