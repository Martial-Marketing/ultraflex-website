import{j as e,L as t}from"./app-Cx4RqbJx.js";import{A as s}from"./app-layout-Cu6BHEa_.js";import"./dropdown-menu-DpdOWZg2.js";import"./card-3-zccYPB.js";function r({auth:a}){return e.jsxs(s,{auth:a,children:[e.jsx(t,{title:"Example Page with Layout - UltraFlex",children:e.jsx("meta",{name:"description",content:"Example page showing how to use the app layout with navbar and footer."})}),e.jsx("div",{className:"container mx-auto px-6 py-16",children:e.jsxs("div",{className:"max-w-4xl mx-auto",children:[e.jsx("h1",{className:"text-4xl font-bold text-gray-900 mb-8",children:"Example Page with Layout"}),e.jsxs("div",{className:"bg-white rounded-lg shadow-lg p-8 mb-8",children:[e.jsx("h2",{className:"text-2xl font-semibold text-gray-800 mb-4",children:"How to Use App Layout"}),e.jsx("p",{className:"text-gray-600 mb-4",children:"This page demonstrates how to use the AppLayout component to automatically include the navbar and footer on any page."}),e.jsxs("div",{className:"bg-gray-50 rounded p-4 mb-4",children:[e.jsx("h3",{className:"font-semibold text-gray-800 mb-2",children:"Usage:"}),e.jsx("pre",{className:"text-sm text-gray-600",children:`import AppLayout from '@/layouts/app-layout';

export default function MyPage({ auth }) {
    return (
        <AppLayout auth={auth}>
            <Head title="My Page" />
            
            {/* Your page content here */}
            <div className="container mx-auto px-6 py-16">
                <h1>My Page Content</h1>
            </div>
        </AppLayout>
    );
}`})]}),e.jsxs("div",{className:"bg-blue-50 rounded p-4",children:[e.jsx("h3",{className:"font-semibold text-blue-800 mb-2",children:"Benefits:"}),e.jsxs("ul",{className:"list-disc list-inside text-blue-700 space-y-1",children:[e.jsx("li",{children:"Automatic navbar and footer on every page"}),e.jsx("li",{children:"Consistent layout structure"}),e.jsx("li",{children:"User authentication state passed to navbar"}),e.jsx("li",{children:"Responsive design built-in"}),e.jsx("li",{children:"Easy to maintain and update"})]})]})]}),a.user?e.jsxs("div",{className:"bg-green-50 rounded-lg p-6",children:[e.jsx("h3",{className:"font-semibold text-green-800 mb-2",children:"Logged in as:"}),e.jsxs("p",{className:"text-green-700",children:[a.user.name," (",a.user.email,")"]})]}):e.jsxs("div",{className:"bg-yellow-50 rounded-lg p-6",children:[e.jsx("h3",{className:"font-semibold text-yellow-800 mb-2",children:"Not logged in"}),e.jsx("p",{className:"text-yellow-700",children:"The navbar will show login/register options"})]})]})})]})}export{r as default};
