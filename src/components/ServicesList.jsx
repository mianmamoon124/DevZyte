"use client";
import Link from "next/link";

const ServicesList = () => {
  return (
    <div className="max-w-[1320px] mx-auto px-0 lg:px-[80px] py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Box 1 */}
        <Link
          href="/unique-offerings"
          className="bg-black text-white p-8 flex flex-col justify-between rounded-lg hover:shadow-lg transition-shadow duration-300 border-2 border-transparent hover:border-[#60ea00]"
        >
          <div>
            <h3 className="text-secondary text-[18px] font-bold mb-4 heading">
              AI & MACHINE LEARNING
            </h3>
            <ul className="space-y-2">
              <li>• Predictive Analytics</li>
              <li>• Data Mining</li>
              <li>• NLP</li>
              <li>• Image Recognition</li>
              <li>• Speech Recognition</li>
              <li>• Chatbots</li>
            </ul>
          </div>
          <div className="text-secondary mt-4 text-right">
            <span className="text-2xl">&rarr;</span>
          </div>
        </Link>

        {/* Box 2 */}
        <Link
          href="/unique-offerings"
          className="bg-black text-white p-8 flex flex-col justify-between rounded-lg hover:shadow-lg transition-shadow duration-300 border-2 border-transparent hover:border-[#60ea00]"
        >
          <div>
            <h3 className="text-secondary text-[18px] font-bold mb-4 heading">
              WEB DEVELOPMENT
            </h3>
            <ul className="space-y-2">
              <li>• Custom Web Development</li>
              <li>• eCommerce Web Development</li>
              <li>• CMS Development</li>
              <li>• Web App Development</li>
              <li>• API Development</li>
              <li>• Progressive Web Apps</li>
            </ul>
          </div>
          <div className="text-secondary mt-4 text-right">
            <span className="text-2xl">&rarr;</span>
          </div>
        </Link>

        {/* Box 3 */}
        <Link
          href="/unique-offerings"
          className="bg-black text-white p-8 flex flex-col justify-between rounded-lg hover:shadow-lg transition-shadow duration-300 border-2 border-transparent hover:border-[#60ea00]"
        >
          <div>
            <h3 className="text-secondary text-[18px] font-bold mb-4 heading">
              MOBILE APP DEVELOPMENT
            </h3>
            <ul className="space-y-2">
              <li>• IOS App Development</li>
              <li>• Android App Development</li>
              <li>• Cross Platform App</li>
              <li>• React Native Development</li>
              <li>• Flutter Development</li>
            </ul>
          </div>
          <div className="text-secondary mt-4 text-right">
            <span className="text-2xl">&rarr;</span>
          </div>
        </Link>

        {/* Box 4 */}
        <Link
          href="/unique-offerings"
          className="bg-black text-white p-8 flex flex-col justify-between rounded-lg hover:shadow-lg transition-shadow duration-300 border-2 border-transparent hover:border-[#60ea00]"
        >
          <div>
            <h3 className="text-secondary text-[18px] font-bold mb-4 heading">
              DEVOPS & CLOUD COMPUTING
            </h3>
            <ul className="space-y-2">
              <li>• Cloud Migration</li>
              <li>• Infrastructure Automtaion</li>
              <li>• CI/CD</li>
              <li>• Monitoring % Securit</li>
              <li>• Serverless Architecture</li>
            </ul>
          </div>
          <div className="text-secondary mt-4 text-right">
            <span className="text-2xl">&rarr;</span>
          </div>
        </Link>

        {/* Box 5 */}
        <Link
          href="/unique-offerings"
          className="bg-black text-white p-8 flex flex-col justify-between rounded-lg hover:shadow-lg transition-shadow duration-300 border-2 border-transparent hover:border-[#60ea00]"
        >
          <div>
            <h3 className="text-secondary text-[18px] font-bold mb-4 heading">
              QA & TESTING
            </h3>
            <ul className="space-y-2">
              <li>• Manual Testing</li>
              <li>• Automated Testing</li>
              <li>• Performance Testing</li>
              <li>• Security Testing </li>
              <li>• Usability Testing</li>
            </ul>
          </div>
          <div className="text-secondary mt-4 text-right">
            <span className="text-2xl">&rarr;</span>
          </div>
        </Link>

        {/* Box 6 */}
        <Link
          href="/unique-offerings"
          className="bg-black text-white p-8 flex flex-col justify-between rounded-lg hover:shadow-lg transition-shadow duration-300 border-2 border-transparent hover:border-[#60ea00]"
        >
          <div>
            <h3 className="text-secondary text-[18px] font-bold mb-4 heading">
              TEAM AS A SERVICE
            </h3>
            <ul className="space-y-2">
              <li>• Dedicated Team</li>
              <li>• Extended Team</li>
              <li>• Project-Based Team</li>
              <li>• On-demand Team</li>
              <li>• Managed Services</li>
            </ul>
          </div>
          <div className="text-secondary mt-4 text-right">
            <span className="text-2xl">&rarr;</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ServicesList;
