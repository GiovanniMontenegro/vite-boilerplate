// import { Breadcrumb } from 'antd';
// import type { BreadcrumbItemType } from 'antd/es/breadcrumb/Breadcrumb';
// import { useEffect, useState } from 'react';
// import { useLocation } from 'react-router';


// const PageBreadcrumb: React.FC = () => {
//     const location = useLocation();
//     console.log("🚀 ~ location:", location)
//     const [breadcrumbs, setBreadcrumbs] = useState<Array<BreadcrumbItemType>>([])

//     useEffect(() => {
//         // setBreadcrumbs(matches.map((match) => {
//         //     return {
//         //         title: "flattendRoutes[match.pathname]?.title"
//         //     }
//         // }))
//     }, [matches])


//     return <Breadcrumb style={{ margin: '16px 20px' }} items={breadcrumbs} />;
// };

// export default PageBreadcrumb