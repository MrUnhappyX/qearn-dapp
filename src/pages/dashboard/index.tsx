import { motion } from 'framer-motion';
import TVL from './charts/TVL';
import BonusAmountAnalyzer from './charts/BonusAmountAnalyzer';
import Richlist from './charts/Richlist';

const Dashboard: React.FC = () => {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex gap-4 flex-wrap">
      {/* <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }}>
        <QearnSummarize />
      </motion.div> */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.5 }}>
        <TVL />
      </motion.div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.5 }}>
        <BonusAmountAnalyzer />
      </motion.div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.5 }}>
        <Richlist />
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
