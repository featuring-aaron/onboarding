import { GetStaticProps, InferGetStaticPropsType } from 'next';
import dynamic from 'next/dynamic';
import { createSwaggerSpec } from 'next-swagger-doc';

import swaggerSpec from '@root/next-swagger-doc.json';

import 'swagger-ui-react/swagger-ui.css';

const SwaggerUI = dynamic<{
	spec?: any;
}>(import('swagger-ui-react'), { ssr: false });

function ApiDoc({ spec }: InferGetStaticPropsType<typeof getStaticProps>) {
	return <SwaggerUI spec={spec} />;
}

export const getStaticProps: GetStaticProps = async () => {
	const spec: Record<string, any> = createSwaggerSpec({ ...swaggerSpec });

	return {
		props: {
			spec,
		},
	};
};

export default ApiDoc;