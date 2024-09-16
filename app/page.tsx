import { Button } from "@/components/ui/button";
import Link from "next/link";

const HomePage = () => {
  return (
    <main className="w-full h-screen flex justify-center items-center">
      <Button>
        <Link href={"/skill-test"}>Get Started</Link>
      </Button>
    </main>
  );
};

export default HomePage;
