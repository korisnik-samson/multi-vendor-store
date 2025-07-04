import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";

export default function Home() {
    return (
        <div className="flex flex-col gap-y-4">
            <div>
                <Button  variant='elevated'>I'm a Button</Button>
            </div>
            <div>
                <Input placeholder="I'm an Input" />
            </div>
            <div>
                <Progress value={50} />
            </div>
            <div>
                <Textarea value="I am a text value"/>
            </div>
        </div>
    );
}
