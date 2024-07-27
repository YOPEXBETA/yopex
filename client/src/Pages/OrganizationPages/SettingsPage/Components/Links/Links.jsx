import React, { useState, useEffect } from "react";
import SocialMediaLinks from "../Links/components/SocialMediaLinks";
import Card from "../../../../../Components/Cards";
import { useEditSocialMediaLinks } from "../../../../../hooks/react-query/useCompany";
import { useSelector } from "react-redux";

const Links = ({ organizationId, extra }) => {
    const { currentOrganization } = useSelector(state => state.organization);
    const editSocialMediaLinksMutation = useEditSocialMediaLinks(currentOrganization._id);

    const [facebook, setFacebook] = useState("");
    const [instagram, setInstagram] = useState("");
    const [twitter, setTwitter] = useState("");
    const [linkedin, setLinkedin] = useState("");

    const [showFacebookInput, setShowFacebookInput] = useState(false);
    const [showInstagramInput, setShowInstagramInput] = useState(false);
    const [showTwitterInput, setShowTwitterInput] = useState(false);
    const [showLinkedinInput, setShowLinkedinInput] = useState(false);

    // Initialize the state with existing values when `currentOrganization` changes
    useEffect(() => {
        if (currentOrganization) {
            const socialLinks = currentOrganization.socialMediaLinks || [];
            const linksMap = socialLinks.reduce((acc, link) => {
                acc[link.platform] = link.url;
                return acc;
            }, {});

            setFacebook(linksMap['Facebook'] || "");
            setInstagram(linksMap['Instagram'] || "");
            setTwitter(linksMap['Twitter'] || "");
            setLinkedin(linksMap['Linkedin'] || "");
        }
    }, [currentOrganization]);

    const handleSave = () => {
        editSocialMediaLinksMutation.mutate({
            socialMediaLinks: [
                { platform: "Facebook", url: facebook },
                { platform: "Instagram", url: instagram },
                { platform: "Twitter", url: twitter },
                { platform: "Linkedin", url: linkedin },
            ],
        });
    };

    return (
        <Card extra={`p-8 ${extra}`}>
            <div className="">
                <div className="space-y-6">
                    <SocialMediaLinks
                        label="Facebook"
                        showInput={showFacebookInput}
                        inputValue={facebook}
                        setInputValue={setFacebook}
                        toggleInput={() => setShowFacebookInput(!showFacebookInput)}
                    />
                    <SocialMediaLinks
                        label="Instagram"
                        showInput={showInstagramInput}
                        inputValue={instagram}
                        setInputValue={setInstagram}
                        toggleInput={() => setShowInstagramInput(!showInstagramInput)}
                    />
                    <SocialMediaLinks
                        label="Twitter"
                        showInput={showTwitterInput}
                        inputValue={twitter}
                        setInputValue={setTwitter}
                        toggleInput={() => setShowTwitterInput(!showTwitterInput)}
                    />
                    <SocialMediaLinks
                        label="Linkedin"
                        showInput={showLinkedinInput}
                        inputValue={linkedin}
                        setInputValue={setLinkedin}
                        toggleInput={() => setShowLinkedinInput(!showLinkedinInput)}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 mt-10">
                <div className="col-span-1 flex justify-end">
                    <button
                        className={`${"bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80"} text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-28`}
                        type="button"
                        onClick={handleSave}
                    >
                        Save
                    </button>
                </div>
            </div>
        </Card>
    );
};

export default Links;
