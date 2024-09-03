import React from "react";
import Card from "../../../Components/Cards";
import CreateChallengeForm from "./Components/CreateChallengeForm";

const Index = ({ extra }) => {
    return (
        <Card extra={`${extra} p-8 h-full`}>
            <div className="h-full flex items-center justify-center">
                <CreateChallengeForm />
            </div>
        </Card>
    );
};

export default Index;
