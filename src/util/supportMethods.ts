/**
 * 获取触发条件, 最好的方式是先把rnplus的types写好, 然后直接去读
 * 先硬编码服用一个疗程
 */
export default ['open', 'resetTo', 'back', 'backTo', 
'goto'].map(method => `RNPlus.${method}('`)
