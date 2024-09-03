import React from "react";
import Modal from "../../Modals/index";
import CloseIcon from "../../icons/CloseIcon";

const TermsAndConditionsModal = ({ open, handleClose }) => {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            className={`fixed inset-0 z-50 ${open ? "" : "hidden"}`}
        >
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white dark:bg-zinc-800 rounded-lg w-full max-w-lg p-6 relative max-h-[80vh] overflow-y-auto">
                    <button
                        onClick={handleClose}
                        type="button"
                        className="absolute top-4 right-4 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-7 h-7 flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
                        aria-label="Close"
                    >
                        <CloseIcon />
                    </button>
                    <h2 className="text-xl font-bold mb-4 dark:text-white">
                        Terms and Conditions
                    </h2>
                    <div className="terms-content space-y-4 text-sm text-gray-700 dark:text-gray-300">
                        <p>
                            By participating in this challenge, you agree to the following
                            terms and conditions. Please read them carefully before submitting
                            your work.
                        </p>
                        <h3 className="font-semibold">1. Eligibility</h3>
                        <p>
                            Participation is open to individuals who are at least 18 years
                            old. Minors may participate with the consent of a legal guardian.
                            Employees, affiliates, and family members of the organizers are
                            not eligible to participate in this challenge.
                        </p>

                        <h3 className="font-semibold">2. Originality and Intellectual Property</h3>
                        <p>
                            All submissions must be the original work of the participant. You
                            must not submit any content that infringes upon the rights,
                            including but not limited to copyrights, trademarks, trade
                            secrets, or privacy, of any third party. By submitting your work,
                            you represent and warrant that you are the sole and exclusive
                            owner of all rights, titles, and interests in the submitted work.
                        </p>

                        <h3 className="font-semibold">3. Submission Guidelines</h3>
                        <p>
                            Submissions must adhere to the format and size restrictions
                            specified in the challenge details. Each file must be under 5MB
                            and in one of the following formats: .jpg, .jpeg, .png, .gif,
                            .avi, .zip, or any applicable format specified in the submission
                            guidelines. Any submissions that do not meet these criteria will
                            be disqualified.
                        </p>

                        <h3 className="font-semibold">4. Content Restrictions</h3>
                        <p>
                            Submissions must not contain any offensive, defamatory, obscene,
                            or inappropriate content. The organizers reserve the right to
                            disqualify any submissions that violate this rule or are deemed
                            unsuitable for public display. Submissions that include
                            discriminatory or hateful content will be immediately disqualified
                            and reported.
                        </p>

                        <h3 className="font-semibold">5. Usage Rights</h3>
                        <p>
                            By submitting your work, you grant the organizers a perpetual,
                            irrevocable, royalty-free, and non-exclusive license to use,
                            distribute, reproduce, modify, adapt, publish, translate, create
                            derivative works from, and publicly display your submission in any
                            media or format. This includes the right to use your submission
                            for promotional purposes, including but not limited to social
                            media, websites, press releases, and marketing materials.
                        </p>

                        <h3 className="font-semibold">6. Judging Criteria</h3>
                        <p>
                            Submissions will be judged based on creativity, originality,
                            technical skill, and adherence to the theme of the challenge. The
                            decision of the judges is final and binding. No correspondence
                            will be entered into regarding the selection of the winners.
                        </p>

                        <h3 className="font-semibold">7. Prizes</h3>
                        <p>
                            Prizes will be awarded as specified in the challenge details. All
                            taxes, fees, and surcharges on prizes are the sole responsibility
                            of the winners. The organizers reserve the right to substitute
                            prizes of equal or greater value if the advertised prizes become
                            unavailable for any reason.
                        </p>

                        <h3 className="font-semibold">8. Liability and Indemnification</h3>
                        <p>
                            By participating in this challenge, you agree to release and hold
                            harmless the organizers, their affiliates, and their respective
                            officers, directors, employees, and agents from any and all
                            claims, demands, losses, damages, liabilities, and expenses
                            arising out of or in connection with your participation in the
                            challenge, including any injury or damage to persons or property.
                        </p>

                        <h3 className="font-semibold">9. Privacy</h3>
                        <p>
                            The personal information collected from participants will be used
                            only for the purpose of administering this challenge and will not
                            be shared with any third parties, except as necessary for the
                            administration of the challenge or as required by law.
                        </p>

                        <h3 className="font-semibold">10. Governing Law</h3>
                        <p>
                            This challenge and the terms and conditions herein are governed by
                            and construed in accordance with the laws of [Your Jurisdiction].
                            Any disputes arising under or in connection with these terms and
                            conditions shall be subject to the exclusive jurisdiction of the
                            courts of [Your Jurisdiction].
                        </p>

                        <h3 className="font-semibold">11. Amendments</h3>
                        <p>
                            The organizers reserve the right to amend or modify these terms
                            and conditions at any time without prior notice. Any changes will
                            be posted on the challenge website and will take effect
                            immediately.
                        </p>

                        <h3 className="font-semibold">12. Acceptance of Terms</h3>
                        <p>
                            By submitting your work to this challenge, you acknowledge that
                            you have read, understood, and agree to be bound by these terms
                            and conditions. If you do not agree with any of these terms, you
                            should not participate in the challenge.
                        </p>

                        <p>
                            These terms and conditions constitute the entire agreement between
                            you and the organizers with respect to the challenge and
                            supersede all prior or contemporaneous communications, whether
                            electronic, oral, or written, between you and the organizers.
                        </p>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default TermsAndConditionsModal;
